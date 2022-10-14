import { useEffect, useMemo, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ref, push, child } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';
import { toast } from 'react-toastify';

import { LoadingComponent } from 'src/components/LoadingComponent';

import { auth, database } from 'src/config/firebase';
import { DatabaseModelsEnum } from 'src/config/enums/DatabaseEnums';
import { DefaultCaderno, DefaultPagina } from 'src/config/DefaultEntitiesConfig';

import { incrementEntityNumber } from 'src/functions/incrementEntityNumber';

import { AddButton } from "./styles";

import type { MouseEventHandler, MouseEvent } from 'react';
import type { Id } from 'react-toastify';
import type { CadernoModel, PaginaModel } from '@database-model';
import type { CadernoDataResponse } from '@api-types';

type NotebookAddButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
};

export function NotebookAddButton({ onClick }: NotebookAddButtonProps){
    const toastIdRef = useRef<Id>();

    const [user, authLoading, authError] = useAuthState(auth);

    const refCadernosPath = useMemo(() => {
        return DatabaseModelsEnum.USUARIOS + 
            user?.uid + DatabaseModelsEnum.CADERNOS
    }, [user]);

    const [cadernosData, databaseLoading, databaseError] = useObjectVal<CadernoDataResponse.All, string, string>(
        ref(database, refCadernosPath)
    );

    const [cooldown, setCooldown] = useState(false);

    async function handleAddCadernoOnClick(event: MouseEvent<HTMLButtonElement>){
        if(cooldown) {
            if(toastIdRef.current && toast.isActive(toastIdRef.current)) return;

            toastIdRef.current = toast.info("Aguarde alguns instantes para executar esta ação", {
                autoClose: 2 * 1000,
            });

            return;
        };


        const cadernoToCopy =  cadernosData ? {
            ...DefaultCaderno,
            nome: Object.entries(cadernosData).reverse()[0][1].nome
        } : {
            ...DefaultCaderno
        };
        const newCaderno = incrementEntityNumber(cadernoToCopy);

        setCooldown(true);
        const cadernoRef = await push<CadernoModel>(ref(database, refCadernosPath), newCaderno);
        push<PaginaModel>(
            child(cadernoRef, DatabaseModelsEnum.PAGINAS),
            DefaultPagina
        );
    }

    useEffect(() => {
        let timeoutRef: number;

        if(cooldown){
            timeoutRef = window.setTimeout(() => {
                setCooldown(false);
            }, 2 * 1000);
        }

        return () => {
            clearTimeout(timeoutRef);
        }
    }, [cooldown]);

    return (
        <AddButton
            isLoading={authLoading || databaseLoading}
            onClick={onClick || handleAddCadernoOnClick}
        >   
            {((authLoading || databaseLoading) && !authError && !databaseError)
                ? (
                    <LoadingComponent
                        animating
                        className='loading-icon'
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={solid('plus')}
                    />
                )
            }
        </AddButton>
    );
}