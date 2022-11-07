import { useEffect, useMemo, useRef, useState } from "react";
import { ref } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useRouter } from "next/router";
import nookies from 'nookies';

import { api } from 'config/AxiosConfig';
import { ErrorTypes } from 'config/enums/ErrorTypesEnum';
import { DatabaseModelsEnum } from 'config/enums/DatabaseEnums';
import { database } from 'config/firebase/getDatabase';

import { Notebook } from 'components/Notebook';
import { NotebookAddButton } from "components/NotebookAddButton";

import { 
    CadernosPage, 
    ScrollArea,
    ScrollScrollbar,
    ScrollThumb,
    ScrollViewport 
} from "@styles/cadernos";

import type { CadernoDataResponse, ErrorJSON } from '@api-types';
import type { CookiesType } from '@auth-types';
import type { GetServerSideProps } from 'next';
import type { RouteQueryParams } from 'next/router';
import type { HomeProps } from 'src/pages';
import { NotebookView } from "src/components/NotebookView";

type CadernoProps = CadernoServerSideProps;

/**
 * Component
 */
export default function Caderno({ userId, cadernos }: CadernoProps){
    const router = useRouter<RouteQueryParams.Cadernos>();

    const [dataState, setDataState] = useState<string>();
    const [cadernosMap, setCadernosMap] = useState(
        new Map(Object.entries(cadernos).reverse())
    );

    const selectedCadernoKey = useMemo<string | undefined>(() => {
        if(cadernosMap.size === 0) return undefined;

        const cadernoNome = router.query.name?.[0];

        const selectedCadernoKey = Array.from(cadernosMap)
            .find(([key, caderno]) => {
                const nome = caderno.nome.replaceAll(" ", "")
                    .toLowerCase();

                if(nome === cadernoNome){
                    return [key, caderno];
                }
            })?.[0] || Array.from(cadernosMap.keys())[0];

        return selectedCadernoKey;
    }, [router.query]);

    const refCadernosPath = useMemo(() => {
        return DatabaseModelsEnum.USUARIOS + 
            userId + DatabaseModelsEnum.CADERNOS
    }, []);

    const isScrollbarVisible = useMemo(() => {
        return Boolean(dataState);
    }, [dataState]);
    
    const [cadernosData, loading, error] = useObjectVal<CadernoDataResponse.All, string, string>(
        ref(database, refCadernosPath)
    );

    useEffect(() => {
        if(!cadernosData || !Object.entries(cadernosData)){
            return;
        }

        if(!loading && !error && cadernosData){
            setCadernosMap(
                new Map(Object.entries(cadernosData).reverse())
            );
        }
    }, [cadernosData, loading, error]);
    
    return (
        <CadernosPage>
            <ScrollArea
                type="auto"
            >
                <ScrollViewport
                    isScrollVisible={isScrollbarVisible}
                >
                    <div className="add-button">
                        <NotebookAddButton/>
                    </div>
                    <ul>
                        {Array.from(cadernosMap).map(([id, caderno]) => {
                            return (
                                <li
                                    key={id}
                                >
                                    <Notebook
                                        id={id}
                                        caderno={caderno}
                                        isSelected={selectedCadernoKey === id}
                                        cadernosMap={cadernosMap}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </ScrollViewport>
                <ScrollScrollbar 
                    ref={(ref) => {
                        setDataState(ref?.getAttribute("data-state") || undefined);
                    }}
                    orientation="vertical"
                >
                    <ScrollThumb />
                </ScrollScrollbar>
            </ScrollArea>
            <div className="main-view">
                {(selectedCadernoKey) 
                    ? (
                        <NotebookView
                            refPath={refCadernosPath}
                            caderno={{
                                id: selectedCadernoKey,
                                ...cadernosMap.get(selectedCadernoKey)!
                            }}
                        />
                    )
                    : (<h1>Nenhum caderno cadastrado</h1>)
                }
            </div>
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