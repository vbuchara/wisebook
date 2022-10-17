import * as functions from "firebase-functions";

import { DatabaseModelsEnum, UsuarioPrivilegiosEnum } from "../../../src/config/enums/DatabaseEnums";
import { DefaultCaderno, DefaultPagina } from "../../../src/config/DefaultEntitiesConfig";

import type * as Admin from 'firebase-admin';
import type { WisebookDatabase } from '../database';
import type { 
    UsuarioModel, 
    PaginaModel, 
    CadernoModel 
} from "@database-model";

const admin: typeof Admin = require('firebase-admin');

admin.initializeApp();
const db = admin.database() as WisebookDatabase;

export const createUserOnLogin = functions.auth.user().onCreate(async(user) => {
    const error: any = await db.ref<UsuarioModel>(DatabaseModelsEnum.USUARIOS + user.uid).set({
        nome: user.displayName ? user.displayName : null,
        email: user.email ? user.email : null,
        url_foto: user.photoURL ? user.photoURL : null,
        ativo: true,
        privilegios: UsuarioPrivilegiosEnum.USER,
    });

    if(!error){
        db.ref<CadernoModel>(
            DatabaseModelsEnum.USUARIOS + user.uid + DatabaseModelsEnum.CADERNOS
        ).push(DefaultCaderno)
            .child<PaginaModel>(DatabaseModelsEnum.PAGINAS)
            .push(DefaultPagina);
    }
});