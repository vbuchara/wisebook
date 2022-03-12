declare module "@api-types" {
    export enum ErrorTypes {
        WRONG_REQUEST_TYPE = 'Tipo Errado de Requisição',
    }

    export type ErrorJSON = {
        error: ErrorTypes,
        message: string,
    }
}