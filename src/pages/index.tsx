import 'src/config/FirebaseConfig';
import type { GetServerSideProps } from 'next';
import type { CookiesType } from '@auth-types';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import nookies from 'nookies';

import { FirebasErrorTypes, ErrorTypes } from 'config/enums/ErrorTypesEnum';

import { 
	MainPage, 
	Title 
} from '@styles/index';

export type HomeProps = {
	error?: string | null
}

/**
 * Component
 */
export default function Home({ error }: HomeProps){	
	useEffect(() => {
		if(!error) return;

		if(error.includes(FirebasErrorTypes.DECODE_FIREBASE_ID_FAILED)){
			toast.error(ErrorTypes.AUTH_TOKEN_INVALID, {
				autoClose: 4 * 1000,
			});
		}

		if(error.includes(ErrorTypes.USER_NOT_LOGGED)){
			toast.error(error, {
				autoClose: 4 * 1000,
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
	HomeProps, { error?: string }
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
	
		await auth.verifyIdToken(cookies.userToken);
	
		return {
			redirect: {
				destination: '/cadernos',
				permanent: false,
			}, 
	
			props: {
	
			}
		}
	} catch(error: any){
		if(String(error).includes(FirebasErrorTypes.DECODE_FIREBASE_ID_FAILED)){
			nookies.destroy(context, 'userToken');
		}
		
		return {
			props: {
				error: String(error)
			}
		}
	}
};
