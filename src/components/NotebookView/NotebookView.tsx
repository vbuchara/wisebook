import { memo, useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';

import { DatabaseModelsEnum } from 'src/config/enums/DatabaseEnums';

import {
    Container, 
} from './styles';

import type { CadernoModel, PaginaModel, WithId } from "@database-model";
import { NotebookPage } from './components/NotebookPage';
import { NotebookPageSelect } from './components/NotebookPageSelect';

type NotebookViewProps = {
    refPath: string,
    caderno: WithId<CadernoModel>
}

export function NotebookViewComponent({
    refPath,
    caderno
}: NotebookViewProps){

    const notebookPagesMap = useMemo<Map<number, WithId<PaginaModel>>>(() => {
        if(!caderno.paginas) return new Map();

        const formattedPages = Object.entries(caderno.paginas)
            .map<[number, WithId<PaginaModel>]>(
                ([key, pagina]) => [pagina.numero_pagina, { id: key, ...pagina }]
            );

        return new Map(formattedPages);
    }, [caderno.id, Object.keys(caderno.paginas || {}).length]);

    const lastNotebookPageNumber = useMemo<number>(() => {
        return Array.from(notebookPagesMap.keys()).pop() || 1;
    }, [notebookPagesMap.size]);
    
    const [pageNumberSelected, setPageNumberSelected] = useState(1);

    const notebookPageSelected = useMemo<WithId<PaginaModel>>(() => {
        let notebookPage = notebookPagesMap.get(pageNumberSelected);

        if(!notebookPage){
            setPageNumberSelected(lastNotebookPageNumber);
            notebookPage = notebookPagesMap.get(lastNotebookPageNumber)!;
        }

        return notebookPage;
    }, [refPath, caderno.id, pageNumberSelected]);

    const refPagePath = useMemo(() => {
        const pageKey = notebookPageSelected.id;

        return refPath + caderno.id 
            + DatabaseModelsEnum.PAGINAS + pageKey;
    }, [notebookPageSelected]);

    return (
        <Container>
            <NotebookPage
                caderno={caderno}
                page={notebookPageSelected}
                pageNumberSelected={pageNumberSelected}
                refPagePath={refPagePath}
            />
            <NotebookPageSelect
                pageNumberSelected={pageNumberSelected}
                setPageNumberSelected={setPageNumberSelected}
                notebookPagesMap={notebookPagesMap}
                lastNotebookPageNumber={lastNotebookPageNumber}
                refPagesPath={refPath + caderno.id + DatabaseModelsEnum.PAGINAS}
            />
        </Container>
    );
}

export const NotebookView = memo(NotebookViewComponent, (prevProps, nextProps) => {
    return isEqual(prevProps.caderno, nextProps.caderno) &&
        prevProps.refPath === nextProps.refPath;
});