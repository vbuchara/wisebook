export enum ErrorTypes {
    WRONG_REQUEST_TYPE = 'Tipo Errado de Requisição',
    GET_DATA_FAILED = 'Falha ao tentar buscar os dados',
    USER_NOT_LOGGED = 'Usuário não autenticado',
    AUTH_TOKEN_INVALID = 'Token de Autenticação Invalido'
}

export enum FirebasErrorTypes {
    DECODE_FIREBASE_ID_FAILED = 'Decoding Firebase ID token failed',
}