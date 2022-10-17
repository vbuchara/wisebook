import * as functions from "firebase-functions";
import {  } from 'firebase-admin/database';

import { DatabaseModelsEnum } from "../../../src/config/enums/DatabaseEnums";

import type { PaginaModel } from '@database-model';

export const orderOnPageDelete = functions.database.ref(
    DatabaseModelsEnum.USUARIOS + "{usuario}" + DatabaseModelsEnum.CADERNOS
        + "{caderno}" + DatabaseModelsEnum.PAGINAS + "{pagina}"
).onDelete(async(snapshot, context) => {
    const pageDeleted: PaginaModel = snapshot.val();
    const notebookPages = await snapshot.ref.parent?.get(); 
    
    notebookPages?.forEach((childSnapshot) => {
        const numeroPagina: number = childSnapshot.child('numero_pagina').val();
        if(pageDeleted.numero_pagina < numeroPagina){
            childSnapshot.child('numero_pagina').ref.set(numeroPagina - 1);
        }
    });
});