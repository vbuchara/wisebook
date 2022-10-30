import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ref, update } from '@firebase/database';
import debounce from 'lodash/debounce';

import { ActionButton } from '../ActionButton';
import { NotebookDeleteButton } from '../NotebookDeleteButton';

import { DefaultCaderno } from 'src/config/DefaultEntitiesConfig';
import { DatabaseModelsEnum } from 'src/config/enums/DatabaseEnums';
import { auth, database } from 'src/config/firebase';

import { incrementEntityNumber } from 'src/functions/incrementEntityNumber';

import NotebookModelSvg from '@public/notebook-model.svg';

import {
    ActionButtonsDiv,
    Container,
    NotebookModelButton
} from './styles';

import type { CadernoModel, UpdateBatch } from "@database-model";
import type { MouseEvent, FormEvent } from 'react';

type NotebookProps = {
    id: string
    caderno: CadernoModel,
    isSelected?: boolean,
    cadernosMap: Map<string, CadernoModel>
};

export function Notebook({ 
    id, 
    caderno, 
    isSelected,
    cadernosMap
}: NotebookProps) {
    const router = useRouter();

    const cadernoNameRef = useRef<HTMLSpanElement>(null);

    const [cadernoNameOffset, setCadernoNameOffset] = useState<number>();

    const refCadernoPath = useMemo(() => {
        return DatabaseModelsEnum.USUARIOS + auth.currentUser?.uid
            + DatabaseModelsEnum.CADERNOS + id;
    }, [id, auth.currentUser && auth.currentUser.uid]);

    const thisDefaultCadernoName = useMemo<string>(() => {
        const cadernosArray = Array.from(cadernosMap);
        const selectedCadernoIndex = cadernosArray.findIndex(([findId], index) => {
            if(index === cadernosArray.length - 1) return false;
            
            return findId === id;
        });

        if(selectedCadernoIndex < 0 || selectedCadernoIndex === cadernosArray.length - 1) 
            return { ...DefaultCaderno }.nome;

        const previousCaderno = cadernosArray[selectedCadernoIndex + 1][1];

        return incrementEntityNumber(previousCaderno).nome;
    }, [cadernosMap, id]);
    
    function handleNotebookOnClick(event: MouseEvent<HTMLButtonElement>){
        if(isSelected) return;
        const formattedName = caderno.nome.replaceAll(" ", "").toLowerCase();

        router.push(`/cadernos/${formattedName}`);
    }

    const debouncedHandleNotebookNameChange = useCallback(debounce(
        handleNotebookNameChange,
        10,
        {
            leading: true,
            trailing: false,
        }
    ), [refCadernoPath, caderno.nome, isSelected]);

    async function handleNotebookNameChange(event: FormEvent<HTMLSpanElement>){
        if(!event.currentTarget || !cadernoNameRef.current) return;
        const newName = event.currentTarget.textContent
             || thisDefaultCadernoName;    
        
        const updateChanges: UpdateBatch<CadernoModel> = {};
        updateChanges[refCadernoPath] = { ...caderno, nome: newName };

        setCadernoNameOffset(
            document.getSelection()?.getRangeAt(0).startOffset
        );

        await update(
            ref(database),
            updateChanges
        );

        if(!isSelected) return;

        router.push(`/cadernos/${newName.replaceAll(" ", "").trim().toLowerCase()}`);
    }

    if(typeof window !== "undefined"){
        useLayoutEffect(() => {
            if(cadernoNameOffset === undefined) return;
            if(!cadernoNameRef.current) return;
            if(document.activeElement !== cadernoNameRef.current) return;
    
            const content = cadernoNameRef.current.childNodes[0];
            
            if(!content || content.nodeType !== Node.TEXT_NODE) return;
    
            const newRange = document.createRange();
            newRange.setStart(content, cadernoNameOffset);
    
            const selection = document.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(newRange);
        });
    }

    return (
        <Container
            isSelected={Boolean(isSelected)}
        >
            <NotebookModelButton
                onClick={handleNotebookOnClick}
                svgBorderColor={caderno.configuracoes?.cor_capa}
                svgCoverColor={caderno.configuracoes?.cor_capa}
            >
                <NotebookModelSvg/>
            </NotebookModelButton>
            <span 
                ref={cadernoNameRef}
                onInput={debouncedHandleNotebookNameChange}
                contentEditable
                suppressContentEditableWarning={true}
            >{caderno.nome}</span>
            <ActionButtonsDiv>
                <NotebookDeleteButton
                    id={id}
                    name={caderno.nome}
                    isSelected={Boolean(isSelected)}
                />
                <ActionButton
                    icon={solid('gear')}
                    tooltipText="Configurar Caderno"
                />
            </ActionButtonsDiv>
        </Container>
    );
}