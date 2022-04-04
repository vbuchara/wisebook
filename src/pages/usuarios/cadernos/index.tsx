

import type { CadernoDataResponse, ErrorJSON } from '@api-types';
import type { CookiesType } from '@auth-types';
import type { GetServerSideProps } from 'next';
import type { RouteQueryParams } from 'next/router';

import { useRouter } from "next/router";
import nookies from 'nookies';

import { api } from 'config/AxiosConfig';
import { ErrorTypes } from 'config/enums/ErrorTypesEnum';

type CadernoProps = CadernoServerSideProps;

/**
 * Component
 */
export default function Caderno({ caderno }: CadernoProps){
    const router = useRouter<RouteQueryParams.Cadernos>();

    return (
        <div>
            <h1>{ caderno?.nome }</h1>
        </div>
    );
}

type CadernoServerSideProps = {
    caderno: CadernoDataResponse.First,
};

/**
 * Server Side
 */
export const getServerSideProps: GetServerSideProps<
    CadernoServerSideProps
> = async(context) => {
    const cookies: CookiesType = nookies.get(context);
    
    try{
        if(!cookies.userToken){
            throw new Error(ErrorTypes.USER_NOT_LOGGED);
        }

        const admin = await import('config/FirebaseAdminConfig');
        const auth = admin.default.auth();

        const user = await auth.verifyIdToken(cookies.userToken);

        const { data } = await api.get<CadernoDataResponse.First | ErrorJSON>(
            `/api/${user.uid}/cadernos/first`
        );

        if('error' in data){
            throw new Error(data.error);
        }

        return {
            props: {
                caderno: data,
            }
        }
    } catch(error: any){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}