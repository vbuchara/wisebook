import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "../../config/FirebaseConfig";

import { ErrorJSON, ErrorTypes } from "@api-types";

export default function login(request: NextApiRequest, response: NextApiResponse){
    if(request.method === 'GET'){
        
    }

    return response.status(400).json({
        error: ErrorTypes.WRONG_REQUEST_TYPE,
        message: "Nada retornado da api."
    } as ErrorJSON);
}