declare module "@api-types" {
    export enum ErrorTypes {
        WRONG_REQUEST_TYPE = 'Tipo Errado de Requisicao',
    }

    export type ErrorJSON = {
        error: ErrorTypes,
        message: string,
    }
}