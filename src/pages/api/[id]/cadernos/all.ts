import type { NextApiResponse, NextApiRequest } from "next";
import type { WisebookDatabase } from 'functions/src/database';
import type { 
    ErrorJSON, 
    CadernoPathParams, 
    CadernoDataResponse, 
    CadernoDataSnapshots 
} from "@api-types";

import admin from 'config/FirebaseAdminConfig';

import { ErrorTypes } from 'src/config/enums/ErrorTypesEnum';
import { DatabaseModelsEnum } from "src/config/enums/DatabaseEnums";

export default async function(
    request: NextApiRequest, 
    response: NextApiResponse<CadernoDataResponse.All | ErrorJSON>
) {
    if(request.method === 'GET'){
        const { id } = request.query as CadernoPathParams.First;
        const database = admin.database() as WisebookDatabase;

        try{
            const dataSnapshot = await database
                .ref(DatabaseModelsEnum.USUARIOS + id + DatabaseModelsEnum.CADERNOS)
                .get<CadernoDataSnapshots.AllCadernos>();
            const data = dataSnapshot.val();

            if(data === null) throw new Error("Nenhum dado Encontrado");
        
            return response.status(200).json(data);

        } catch(error: any) {
            return response.status(200).json({
                error: ErrorTypes.GET_DATA_FAILED,
                message: String(error),
            })
        }
    }   

    response.status(400).json({
        error: ErrorTypes.WRONG_REQUEST_TYPE,
        message: "Apenas requisições GET"
    });
}