import { useCallback, useMemo, useRef, forwardRef, useState } from 'react';
import { useRouter } from 'next/router';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ref, update } from '@firebase/database';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

import { ActionButton } from '../ActionButton';
import { NotebookDeleteButton } from '../NotebookDeleteButton';
import { WisebookTooltip } from '../WisebookTooltip';

import { DefaultCaderno } from 'src/config/DefaultEntitiesConfig';
import { DatabaseModelsEnum } from 'src/config/enums/DatabaseEnums';
import { auth, database } from 'src/config/firebase';

import { incrementEntityNumber } from 'src/functions/incrementEntityNumber';

import NotebookModelSvg from '@public/notebook-model.svg';

import { fontSizes } from '@styles/base/fonts';

import { NotebookConfigButtonTrigger } from '../NotebookConfigModal';

import {
    ActionButtonsDiv,
    Container,
    NotebookModelLink,
    NotebookName
} from './styles';

import type { CadernoModel, UpdateBatch } from "@database-model";
import type { MouseEvent, KeyboardEvent } from 'react';

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

    const cadernoNameRef = useRef<HTMLInputElement | null>(null);

    const [notebookNameValue, setNotebookNameValue] = useState(caderno.nome);

    const handleOnKeyDownCallbacksMap = useMemo(() => {
        return new Map([
            ['Enter', handleNotebookNameEnter]
        ]) as HandleOnKeyPressCallbacksType<HTMLInputElement>;
    }, []);

    const formattedCadernoName = useMemo(() => {
        return caderno.nome.replaceAll(" ", "").toLowerCase();
    }, [caderno.nome]);

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
    
    function handleNotebookOnClick(event: MouseEvent<HTMLAnchorElement>){
        if(isSelected) event.preventDefault();
    }

    const debouncedHandleNotebookNameChange = useCallback(debounce(
        handleNotebookNameChange,
        500,
        {
            leading: false,
            trailing: true,
        }
    ), [refCadernoPath, caderno.nome, isSelected]);

    function handleNotebookNameEnter(_: KeyboardEvent<HTMLSpanElement>){
        if(!cadernoNameRef.current) return;

        cadernoNameRef.current.blur();
    }
    
    function handleNotebookNameBlur(){
        if(!cadernoNameRef.current) return;
        
        const value = cadernoNameRef.current.value;
        
        const isNotUnique = Array.from(cadernosMap.entries())
            .some(([thisId, thisCaderno]) => {
                const name: string = thisCaderno.nome.replaceAll(" ", "").toLowerCase();
                const formattedNewName: string = value.replaceAll(" ", "").toLowerCase();
                
                return name === formattedNewName && thisId !== id;
            });

        if(isNotUnique) {
            toast.error(`Algum caderno já possui esse nome, tente novamente!`, {
                autoClose: 4 * 1000
            });
            cadernoNameRef.current.value = caderno.nome;
            setNotebookNameValue(caderno.nome);

            return;
        }
        
        debouncedHandleNotebookNameChange(value || thisDefaultCadernoName);
    }
    
    async function handleNotebookNameChange(newName: string){
        if(!cadernoNameRef.current) return;   
        const formattedNewName = newName.replaceAll(" ", "").toLowerCase();
        
        const updateChanges: UpdateBatch<string> = {};
        
        updateChanges[`${refCadernoPath}/nome`] = newName;

        await update(
            ref(database),
            updateChanges
        );

        if(!isSelected) return;
        router.push(`/cadernos/${formattedNewName}`);
    }
    
    const FowardNotebookName = useMemo(() => { 
        return forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => {
            const { ref: propsRef, as, ...inputProps } = props;
            return <NotebookName
                {...inputProps}
                inputRef={(inputRef) => {
                    cadernoNameRef.current = inputRef;
                    
                    if(typeof ref === 'function'){
                        ref(inputRef);
                    }

                    if(ref && 'current' in ref){
                        ref.current = inputRef;
                    }
                }}
                onBlur={handleNotebookNameBlur}
                onKeyDown={(event) => {
                    handleOnKeyDownCallbacksMap.get(event.key)?.(event);
                }}
                inputStyle={{
                    fontSize: fontSizes.clampBase()
                }}
            />
        })
    }, [caderno.nome]);

    return (
        <Container
            isSelected={Boolean(isSelected)}
        >
            <NotebookModelLink
                href={`/cadernos/${formattedCadernoName}`}
                onClick={handleNotebookOnClick}
                svgBorderColor={caderno.configuracoes?.cor_capa}
                svgCoverColor={caderno.configuracoes?.cor_capa}
            >
                <NotebookModelSvg/>
            </NotebookModelLink>
            <WisebookTooltip
                tooltipText={caderno.nome}
            >
                <FowardNotebookName
                    value={notebookNameValue}
                    onInput={(event) => setNotebookNameValue(event.currentTarget.value)}
                />
            </WisebookTooltip>
            <ActionButtonsDiv>
                <NotebookDeleteButton
                    id={id}
                    name={caderno.nome}
                    isSelected={Boolean(isSelected)}
                />
                <NotebookConfigButtonTrigger
                    caderno={{
                        id,
                        ...caderno
                    }}
                    type="Caderno"
                />
            </ActionButtonsDiv>
        </Container>
    );
}