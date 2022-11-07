import { lastNumbersRegex, getLastNumber } from './getLastNumber';

import type { CadernoModel } from "@database-model";

export function findLastNotebook(notebooks: [string, CadernoModel][]): CadernoModel | undefined{
    const previousCadernoName = notebooks.reverse()[0][1]
        .nome
        .replace(lastNumbersRegex, "")
        .trim();

    const filteredNotebooks = notebooks.filter(([_, notebook]) => {
        const notebookName = notebook.nome
            .replace(lastNumbersRegex, "")
            .trim();

        return previousCadernoName === notebookName;
    });

    return filteredNotebooks.reduce(([lastKey, lastNotebook], [key, notebook]) => {
        const lastNotebookNumber = Number(getLastNumber(lastNotebook.nome));
        const notebookNumber = Number(getLastNumber(notebook.nome));

        return lastNotebookNumber > notebookNumber 
            ? [lastKey, lastNotebook] 
            : [key, notebook];
    })[1];
}