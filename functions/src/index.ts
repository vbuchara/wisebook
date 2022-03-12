import * as functions from "firebase-functions";
import type * as Admin from 'firebase-admin';

import type { WisebookDatabase } from '../modules';
import type { UsuarioModel } from "@database-model";
import { DatabaseModelsEnum } from "../../src/config/DatabaseEnum";

const admin: typeof Admin = require('firebase-admin');

admin.initializeApp();
const db = admin.database() as WisebookDatabase;

export const createUserOnLogin = functions.auth.user().onCreate((user) => {
    db.ref<UsuarioModel>(DatabaseModelsEnum.USUARIOS + user.uid).set({
        nome: user.displayName ? user.displayName : null,
        email: user.email ? user.email : null,
        url_foto: user.photoURL ? user.photoURL : null,
        ativo: true
    });
});
