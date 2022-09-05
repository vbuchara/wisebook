export enum ErrorTypes {
    WRONG_REQUEST_TYPE = 'Tipo Errado de Requisição',
    GET_DATA_FAILED = 'Falha ao tentar buscar os dados',
    USER_NOT_LOGGED = 'Usuário não autenticado',
    AUTH_TOKEN_INVALID = 'Token de Autenticação Invalido',
    SESSION_EXPIRED = "A sessão expirou, por favor logue novamente"
}

export enum FirebasErrorTypes {
    DECODE_FIREBASE_ID_FAILED = 'auth/argument-error',
    ID_TOKEN_EXPIRED = 'auth/id-token-expired',
}