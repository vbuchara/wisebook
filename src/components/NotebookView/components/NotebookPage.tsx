import { useCallback, useEffect, useRef, useState } from 'react';
import { update, ref } from '@firebase/database';
import TextAreaAutoResize from 'react-textarea-autosize';
import debounce from 'lodash/debounce';

import { database } from 'src/config/firebase/getDatabase';

import { NotebookPageSvg, NotebookPageWrapper } from "../styles";

import type { CadernoModel, PaginaModel, UpdateBatch, WithId } from '@database-model';

type NotebookPageProp = {
    caderno: WithId<CadernoModel>,
    page: WithId<PaginaModel>,
    refPagePath: string,
    pageNumberSelected: number
}

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

    function handlePageTextOnChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        if(!pageTextTextareaRef.current || !pageLineHeightRef.current) return;

        oldPageTextRef.current = pageText;
        setPageText(event.target.value);
    }

    const debouncedHandleUpdatePageText = useCallback(debounce(
        handleUpdatePageText, 750, { 
            leading: false, 
            trailing: true 
        }
    ), [refPagePath, caderno.id, pageNumberSelected]);

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

    useEffect(() => {
        oldPageTextRef.current = undefined;
        setPageText(page.text || "");
        debouncedHandleUpdatePageText.cancel();
    }, [caderno.id, pageNumberSelected]);

    useEffect(() => {
        if(!pageTextTextareaRef.current || !pageLineHeightRef.current) return;

        const pageTextareaHeight = parseInt(pageTextTextareaRef.current.style.height);
        const pageLineHeight = pageLineHeightRef.current - 1;
        pageLineCountRef.current = pageTextareaHeight / pageLineHeight;
    }, [caderno.id, pageNumberSelected]);

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
                    onChange={handlePageTextOnChange}
                    value={pageText}
                    minRows={1}
                    maxRows={pageLineLimit}
                    onHeightChange={(height, info) => {
                        pageLineHeightRef.current = info.rowHeight;
                    }}
                    onKeyDown={(event) => {
                        if(event.key === "Enter" && pageLineCountRef.current! >= pageLineLimit){
                            event.preventDefault();
                        }
                    }}
                />
            </div>
            <NotebookPageSvg />
        </NotebookPageWrapper>
    );
}