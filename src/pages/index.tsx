import 'src/config/FirebaseConfig';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import nookies from 'nookies';

import { DatabaseModelsEnum } from 'config/enums/DatabaseEnums';

import { WisebookError, WisebookErrorToastType } from 'src/errors/WisebookError';

import { 
	MainPage, 
	Title 
} from '@styles/index';

import type { GetServerSideProps } from 'next';
import type { CookiesType } from '@auth-types';
import type { FirebaseError } from 'firebase/app';

export type HomeProps = {
	error?: string
}

/**
 * Component
 */
export default function Home({ error }: HomeProps){	
	useEffect(() => {
		if(!error) return;
		const wisebookError = WisebookError.fromJsonString(error);
		
		if(wisebookError.toast){
			toast.error(wisebookError.toast.message, {
				autoClose: wisebookError.toast.duration,
			});
		}
	}, [error]);

	return (
		<>
			<Head>
				<title>Wisebook</title>
				<meta name="description" content="A taking note and notebook app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainPage>
				<section>
					<Title>Wisebook Welcoming Text</Title>
				</section>
			</MainPage>
		</>
	)
}

/**
 * Server Side
 */

export const getServerSideProps: GetServerSideProps<
	HomeProps
> = async(context) => {
	const cookies: CookiesType = nookies.get(context);
	
	if(!cookies.userToken){
		return {
			props: {

			}
		}
	}
	
	try {
		const admin = await import('config/FirebaseAdminConfig');
		const auth = admin.default.auth();
		const database = admin.default.database();
	
		const user = await auth.verifyIdToken(cookies.userToken);

		const data = await database.ref(DatabaseModelsEnum.USUARIOS)
			.child(user.uid)
			.get();
		
		if(!data.exists()){
			await auth.deleteUser(user.uid);

			const error = new WisebookError({
				message: "Houve algum problema ao carregar os dados do usuário",
				duration: 10 * 1000
			} as WisebookErrorToastType);
			error.setDestroySession();

			throw error;
		}
	
		return {
			redirect: {
				destination: '/cadernos',
				permanent: false,
			}, 
	
			props: {
	
			}
		}
	} catch(error: any){
		const wisebookError = new WisebookError(error);

		if(wisebookError.shouldDestroySession()){
			nookies.destroy(context, 'userToken');
		}
		
		return {
			props: {
				error: JSON.stringify(wisebookError)
			}
		}
	}
};
