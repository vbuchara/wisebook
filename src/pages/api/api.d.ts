declare module "@api-types" {
    export type ErrorJSON = {
        error: import('../../config/enums/ErrorTypesEnum').ErrorTypes,
        message: any,
    }

    import { CadernoDataResponse, CadernoPathParams, CadernoDataSnapshots } from '@api-types/caderno';
    
    export { 
        CadernoDataResponse, CadernoPathParams, CadernoDataSnapshots
    };
}

declare module "@api-types/caderno" {
    import { CadernoModel } from '@database-model';

    export namespace CadernoPathParams {
        type First = {
            id: string,
        };

        type All = {

        };
    }

    export namespace CadernoDataResponse {
        type First = {
            cadernoId: string,
        } & CadernoModel;

        type All = {
            [key: string]: CadernoModel 
        };
    }

    export namespace CadernoDataSnapshots {
        type AllCadernos = {
            [key: string]: CadernoModel
        };
    }
}