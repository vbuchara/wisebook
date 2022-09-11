import { useEffect, useMemo, useState } from "react";
import { ref, getDatabase } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import nookies from 'nookies';

import { api } from 'config/AxiosConfig';
import { ErrorTypes } from 'config/enums/ErrorTypesEnum';
import { DatabaseModelsEnum } from 'config/enums/DatabaseEnums';
import { firebaseApp } from 'config/FirebaseConfig';

import { Notebook } from 'components/Notebook';

import { 
    CadernosPage, 
    NotebooksListContainer 
} from "src/styles/cadernos";

import type { CadernoDataResponse, ErrorJSON } from '@api-types';
import type { CookiesType } from '@auth-types';
import type { GetServerSideProps } from 'next';
import type { HomeProps } from 'src/pages';

type CadernoProps = CadernoServerSideProps;

const database = getDatabase(firebaseApp);

/**
 * Component
 */
export default function Caderno({ userId, cadernos }: CadernoProps){
    const refCadernosPath = useMemo(() => {
        return DatabaseModelsEnum.USUARIOS + 
            userId + DatabaseModelsEnum.CADERNOS
    }, []);

    const [cadernosData, loading, error] = useObjectVal<CadernoDataResponse.All, string, string>(
        ref(database, refCadernosPath)
    );

    const [cadernosMap, setCadernosMap] = useState(
        new Map(Object.entries(cadernos))
    );

    useEffect(() => {
        if(!cadernosData || !Object.entries(cadernosData)){
            return;
        }

        if(!loading && !error && cadernosData){
            setCadernosMap(
                new Map(Object.entries(cadernosData))
            );
        }
    }, [cadernosData, loading, error]);
    
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
    userId: string,
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
                userId: user.uid,
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