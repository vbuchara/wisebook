import type { NextApiResponse, NextApiRequest } from "next";
import type { WisebookDatabase } from 'functions/src/database';
import type { 
    ErrorJSON, 
    CadernoQueryParams, 
    CadernoDataResponse, 
    CadernoDataSnapshots 
} from "@api-types";

import admin from 'config/FirebaseAdminConfig';

import { ErrorTypes } from 'src/config/enums/ErrorTypesEnum';
import { DatabaseModelsEnum } from "src/config/enums/DatabaseEnums";

export default async function(
    request: NextApiRequest, 
    response: NextApiResponse<CadernoDataResponse.First | ErrorJSON>
) {
    if(request.method === 'GET'){
        const { id } = request.query as CadernoQueryParams.First;
        const database = admin.database() as WisebookDatabase;

        try{
            const dataSnapshot = await database
                .ref(DatabaseModelsEnum.USUARIOS + id + DatabaseModelsEnum.CADERNOS)
                .get<CadernoDataSnapshots.First>();
            const data = dataSnapshot.val();

            if(data === null) throw new Error("Nenhum dado Encontrado");
            
            const cadernoId = Object.keys(data)[0];
            const firstCaderno: CadernoDataResponse.First = { 
                cadernoId,
                ...data[cadernoId]
            } ;

            return response.status(200).json(firstCaderno);

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