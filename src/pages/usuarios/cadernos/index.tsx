import { useMemo } from "react";
import { useRouter } from "next/router";
import nookies from 'nookies';

import { api } from 'config/AxiosConfig';
import { ErrorTypes } from 'config/enums/ErrorTypesEnum';

import { Notebook } from 'components/Notebook';

import { 
    CadernosPage, 
    NotebooksListContainer 
} from "src/styles/cadernos";

import type { CadernoDataResponse, ErrorJSON } from '@api-types';
import type { CookiesType } from '@auth-types';
import type { GetServerSideProps } from 'next';
import type { RouteQueryParams } from 'next/router';
import type { HomeProps } from 'src/pages';

type CadernoProps = CadernoServerSideProps;

/**
 * Component
 */
export default function Caderno({ cadernos }: CadernoProps){
    const router = useRouter<RouteQueryParams.Cadernos>();
    const cadernosMap = useMemo(() => {
        return new Map(Object.entries(cadernos));
    }, []);

    return (
        <CadernosPage>
            <NotebooksListContainer>
                {Array.from(cadernosMap).map(([id, caderno]) => {
                    return (
                        <li
                            key={id}
                        >
                            <Notebook
                                id={id}
                                caderno={caderno}
                            />
                        </li>
                    );
                })}
            </NotebooksListContainer>
            <h1>{ cadernosMap.get(Object.keys(cadernos)[0])?.nome }</h1>
        </CadernosPage>
    );
}

type CadernoServerSideProps = {
    cadernos: CadernoDataResponse.All,
};

/**
 * Server Side
 */
export const getServerSideProps: GetServerSideProps<
    CadernoServerSideProps | HomeProps
> = async(context) => {
    const cookies: CookiesType = nookies.get(context);
    
    try{
        if(!cookies.userToken){
            throw new Error(ErrorTypes.USER_NOT_LOGGED);
        }

        const admin = await import('config/FirebaseAdminConfig');
        const auth = admin.default.auth();

        const user = await auth.verifyIdToken(cookies.userToken);

        const { data } = await api.get<CadernoDataResponse.All | ErrorJSON>(
            `/api/${user.uid}/cadernos/all`
        );
        
        if('error' in data){
            throw new Error((data as ErrorJSON).error);
        }

        return {
            props: {
                cadernos: data,
            }
        }
    } catch(error: any){
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            }
        }
    }
}