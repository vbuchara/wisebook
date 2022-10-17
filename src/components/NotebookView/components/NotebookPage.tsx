import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { update, ref } from '@firebase/database';
import TextAreaAutoResize from 'react-textarea-autosize';
import debounce from 'lodash/debounce';
import * as indent from 'indent-textarea';

import { database } from 'src/config/firebase/getDatabase';

import { NotebookPageSvg, NotebookPageWrapper } from "../styles";

import type { CadernoModel, PaginaModel, UpdateBatch, WithId } from '@database-model';

type NotebookPageProp = {
    caderno: WithId<CadernoModel>,
    page: WithId<PaginaModel>,
    refPagePath: string,
    pageNumberSelected: number
}

type HandleTextareaOnKeyPressCallbacksMapType = HandleOnKeyPressCallbacksType<
    HTMLTextAreaElement
>;

export function NotebookPage({
    caderno,
    page,
    pageNumberSelected,
    refPagePath
}: NotebookPageProp){
    const pageLineLimit = 24;
    
    const pageLineHeightRef = useRef<number>();
    const pageLineCountRef = useRef<number>();
    const oldPageTextRef = useRef<string>();
    const pageTextTextareaRef = useRef<HTMLTextAreaElement>(null);

    const [pageText, setPageText] = useState(
        page.text || ""
    );

    const handleTextareaOnKeyPressCallbacksMap = useMemo<HandleTextareaOnKeyPressCallbacksMapType>(() => {
        return new Map<KeyboardEventKey, (event: React.KeyboardEvent<HTMLTextAreaElement>) => void>([
            ['Enter', handlePageTextEnter],
            ['Tab', handlePageTextTab],
            ['Shift', (event) => { 
                event.preventDefault();
             }]
        ]) as HandleTextareaOnKeyPressCallbacksMapType;
    }, [pageText]);

    function handlePageTextEnter(event: React.KeyboardEvent<HTMLTextAreaElement>){
        if(pageLineCountRef.current! < pageLineLimit) return;


        event.preventDefault();
    }

    function handlePageTextTab(event: React.KeyboardEvent<HTMLTextAreaElement>){
        event.preventDefault();
        if(!pageTextTextareaRef.current) return;

        if(event.shiftKey){
            indent.unindent(pageTextTextareaRef.current);
            return;
        }

        indent.indent(pageTextTextareaRef.current);
    }

    function handlePageTextOnChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        if(!pageTextTextareaRef.current || !pageLineHeightRef.current) return;

        oldPageTextRef.current = pageText;
        setPageText(event.target.value);
    }

    function handleUpdatePageText(pageTextValue: string){
        const pageSelected = page;
        pageSelected.text = pageTextValue;

        const { id: _, ...pageToUpdate } = pageSelected;
        const updateChanges = {} as UpdateBatch<PaginaModel>;
        updateChanges[refPagePath] = pageToUpdate;
        
        update(
            ref(database),
            updateChanges
        );
    }

    const debouncedHandleUpdatePageText = useCallback(debounce(
        handleUpdatePageText, 750, { 
            leading: false, 
            trailing: true 
        }
    ), [refPagePath, caderno.id, pageNumberSelected, page.id]);

    const debouncedTextAreaOnChange = useCallback(debounce(
        handlePageTextOnChange, 200, {
            leading: true
        }
    ), [pageText]);

    const debouncedTextAreaOnKeyDown = useCallback(debounce(
        (event) => {
            handleTextareaOnKeyPressCallbacksMap.get(event.key)?.(event);
        },
        50,
        {
            leading: true
        }
    ), [handleTextareaOnKeyPressCallbacksMap]);

    useEffect(() => {
        oldPageTextRef.current = undefined;
        setPageText(page.text || "");
        debouncedHandleUpdatePageText.cancel();
    }, [caderno.id, pageNumberSelected, page.id]);

    useEffect(() => {
        if(!pageTextTextareaRef.current || !pageLineHeightRef.current) return;

        const pageTextareaHeight = parseInt(pageTextTextareaRef.current.style.height);
        const pageLineHeight = pageLineHeightRef.current - 1;
        pageLineCountRef.current = pageTextareaHeight / pageLineHeight;
    }, [caderno.id, pageNumberSelected, page.text, page.id]);

    useEffect(() => {
        if(!pageTextTextareaRef.current || !pageLineHeightRef.current) return;

        const pageTextareaHeight = parseInt(pageTextTextareaRef.current.style.height);
        const pageLineHeight = pageLineHeightRef.current - 1;
        pageLineCountRef.current = pageTextareaHeight / pageLineHeight;

        if(pageLineCountRef.current >= pageLineLimit + 1) {
            setPageText(oldPageTextRef.current!);

            return;
        };
    
        debouncedHandleUpdatePageText(pageText);
    }, [pageText]);

    return (
        <NotebookPageWrapper>
            <div 
                className="page-textarea-wrapper"
                onClick={(event) => {
                    pageTextTextareaRef.current?.focus();
                }}
            >
                <TextAreaAutoResize
                    ref={pageTextTextareaRef}
                    onChange={debouncedTextAreaOnChange}
                    value={pageText}
                    minRows={1}
                    maxRows={pageLineLimit}
                    onHeightChange={(height, info) => {
                        pageLineHeightRef.current = info.rowHeight;
                    }}
                    onKeyDown={debouncedTextAreaOnKeyDown}
                />
            </div>
            <NotebookPageSvg />
        </NotebookPageWrapper>
    );
}