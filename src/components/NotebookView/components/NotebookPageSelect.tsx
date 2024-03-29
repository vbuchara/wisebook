import { MouseEvent, useEffect, useMemo, useRef } from "react";
import { faChevronLeft, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput } from "react-imask";
import { ref, push } from "firebase/database";

import { database } from "src/config/firebase/getDatabase";
import { DefaultPagina } from 'src/config/DefaultEntitiesConfig';

import { colors } from "@styles/base/colors";

import { 
    NotebookPageInfo,
    PageSelectedControlButton
} from "../styles";

import type { PageSelectedControlButtonProps } from '../styles';
import type { ActionButton } from '../../ActionButton';

import type { Dispatch, ComponentPropsWithRef, SetStateAction } from 'react';
import type { InputMaskRef } from "react-imask/extended";
import type { CadernoModel, PaginaModel, WithId } from "@database-model";
import type { SetRequired } from 'type-fest';

type NotebookPageSelectProps = {
    pageNumberSelected: number,
    setPageNumberSelected: Dispatch<SetStateAction<number>>,
    notebookPagesMap: Map<number, WithId<PaginaModel>>,
    lastNotebookPageNumber: number,
    refPagesPath: string,
    caderno: WithId<CadernoModel>
};

type NextButtonInfoType = SetRequired<
    Partial<ComponentPropsWithRef<typeof ActionButton>> 
        & PageSelectedControlButtonProps,
    "icon" | "tooltipText"
>;

type HandleNumberPageOnKeyPressCallbacksMapType = HandleOnKeyPressCallbacksType<
    HTMLInputElement
>;

type HandleButtonTypeCallbacksMapType = Map<
    PageSelectedControlButtonProps['type'], 
    (event: MouseEvent<HTMLButtonElement>) => void
>;

export function NotebookPageSelect({
    caderno,
    pageNumberSelected,
    setPageNumberSelected,
    notebookPagesMap,
    lastNotebookPageNumber,
    refPagesPath
}: NotebookPageSelectProps) {
    const numberPageMaskRef = useRef<InputMaskRef>(null);
    const numberPageInputRef = useRef<HTMLInputElement | null>(null);

    const nextButtonInfo = useMemo<NextButtonInfoType>(() => {
        if(pageNumberSelected === notebookPagesMap.size){
            return {
                type: "add",
                tooltipText:'Adicionar Página',
                tooltipTextColor: colors.blue_info,
                icon: faPlus,
            };
        }

        return {
            type: "next",
            tooltipText: 'Próxima Página',
            icon: faChevronRight
        };
    }, [pageNumberSelected, notebookPagesMap]);

    const handleOnKeyPressCallbacksMap = useMemo<HandleNumberPageOnKeyPressCallbacksMapType>(() => {
        return new Map([
            ['Enter', handleNumberPageEnter]
        ]);
    }, [lastNotebookPageNumber]);

    function handleNumberPageEnter(){
        if(!numberPageInputRef.current) return;

        numberPageInputRef.current.blur();
    }

    const handleButtonTypeCallbacksMap = useMemo<HandleButtonTypeCallbacksMapType>(() => {
        return new Map([
            ['add', handleAddButtonOnClick],
            ['next', handleNextButtonOnClick],
            ['previous', handlePreviousButtonOnClick]
        ]);
    }, [lastNotebookPageNumber, pageNumberSelected]);

    async function handleAddButtonOnClick(_: MouseEvent<HTMLButtonElement>){
        const newDefaultPage: PaginaModel = { 
            ...DefaultPagina,
            numero_pagina: lastNotebookPageNumber + 1,
            text: "",
            configuracoes: {
                ...DefaultPagina.configuracoes,
                ...caderno.configuracoes
            }
        };

        await push<PaginaModel>(
            ref(database, refPagesPath),
            newDefaultPage
        );

        setPageNumberSelected(newDefaultPage.numero_pagina);
    }

    function handleNextButtonOnClick(event: MouseEvent<HTMLButtonElement>){
        setPageNumberSelected((pageSelected) => {
            return pageSelected + 1;
        });
    }

    async function handlePreviousButtonOnClick(event: MouseEvent<HTMLButtonElement>){
        if(pageNumberSelected === 1) return;

        setPageNumberSelected((pageSelected) => {
            return pageSelected - 1;
        });
    }

    function handlePageChange(){
        if(!numberPageInputRef.current) return;
        const value = Number(numberPageInputRef.current.value);
        
        if(!value || !notebookPagesMap.has(value)){
            numberPageInputRef.current.value = String(pageNumberSelected);
        } 
        numberPageMaskRef.current?.maskRef.updateValue();

        setPageNumberSelected(Number(numberPageInputRef.current.value));
    }
    
    useEffect(() => {
        if(!numberPageInputRef.current) return;

        numberPageInputRef.current.onkeydown =  function(event) {
            handleOnKeyPressCallbacksMap.get(event.key)?.(event);
        };

        numberPageInputRef.current.onblur = handlePageChange;
    }, [lastNotebookPageNumber, pageNumberSelected]);
    
    return (
        <NotebookPageInfo>
            <PageSelectedControlButton
                type="previous"
                tooltipText='Página Anterior'
                icon={faChevronLeft}
                onClick={handleButtonTypeCallbacksMap.get("previous")}
                disabled={pageNumberSelected === 1}
            />
            <IMaskInput
                mask={/^(?:[1-9][0-9]{0,2}$)(?:\.[0-9]{1,2}$)?/}
                ref={numberPageMaskRef}
                value={String(pageNumberSelected)}
                inputRef={(element) => {
                    numberPageInputRef.current = element as HTMLInputElement;
                }}
                placeholderChar=" "
            />
            <PageSelectedControlButton
                type={nextButtonInfo.type}
                tooltipText={nextButtonInfo.tooltipText}
                icon={nextButtonInfo.icon}
                onClick={handleButtonTypeCallbacksMap.get(nextButtonInfo.type)}
                tooltipTextColor={nextButtonInfo.tooltipTextColor}
            />
        </NotebookPageInfo>
    );
}