import * as functions from "firebase-functions";

import { DatabaseModelsEnum } from "../../../src/config/enums/DatabaseEnums";

import { PaginaModel } from '@database-model';

export const orderOnPageDelete = functions.database.ref(
    DatabaseModelsEnum.USUARIOS + "{usuario}" + DatabaseModelsEnum.CADERNOS
        + "{caderno}" + DatabaseModelsEnum.PAGINAS + "{pagina}"
).onDelete(async(snapshot, context) => {
    const pagesParent = await snapshot.ref.parent?.get();
    const pagesObject: Record<string,PaginaModel> = pagesParent?.val();
    const pagesArray = Object.entries(pagesObject);

    console.log(pagesArray);

    return;
});