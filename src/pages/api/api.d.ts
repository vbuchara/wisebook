declare module "@api-types" {
    export type ErrorJSON = {
        error: import('../../config/enums/ErrorTypesEnum').ErrorTypes,
        message: any,
    }

    import { CadernoDataResponse, CadernoQueryParams, CadernoDataSnapshots } from '@api-types/caderno';
    
    export { 
        CadernoDataResponse, CadernoQueryParams, CadernoDataSnapshots
    };
}

declare module "@api-types/caderno" {
    import { CadernoModel } from '@database-model';

    export namespace CadernoQueryParams {
        type First = {
            id: string,
        }
    }

    export namespace CadernoDataResponse {
        type First = {
            cadernoId: string,
        } & CadernoModel
    }

    export namespace CadernoDataSnapshots {
        type First = {
            [key: string]: CadernoModel
        }
    }
}