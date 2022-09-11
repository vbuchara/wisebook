import { FirebasErrorTypes, ErrorTypes } from 'config/enums/ErrorTypesEnum';

import type { FirebaseError } from "firebase/app";

export type WisebookErrorToastType = {
    message: string;
    duration: number;
} | null;

export class WisebookError extends Error {
    private defaultToast: WisebookErrorToastType = {
        message: "Desculpe-nos, ocorreu alguma falha",
        duration: 4 * 1000,
    };
    private firebaseMessages = new Map<string, WisebookErrorToastType>
    ([
        [
            FirebasErrorTypes.DECODE_FIREBASE_ID_FAILED,
            {
                message: ErrorTypes.AUTH_TOKEN_INVALID,
                duration: 4 * 1000
            }
        ],
        [
            FirebasErrorTypes.ID_TOKEN_EXPIRED,
            {
                message: ErrorTypes.SESSION_EXPIRED,
                duration: 4 * 1000
            }
        ]
    ]);
    private destroySession = false;

    public errorInfo: FirebaseError | undefined;
    public toast: WisebookErrorToastType;

    constructor(error?: any){
        super();
        this.toast = null;
        
        if(!error) return;

        if(error instanceof WisebookError){
            this.errorInfo = error.errorInfo;
            this.toast = error.toast;
            this.destroySession = error.destroySession;

            return;
        }

        if('errorInfo' in error){
            this.errorInfo = error.errorInfo as FirebaseError;

            this.toast = (
                this.firebaseMessages.get(error?.errorInfo?.code) ||
                this.defaultToast
            );
            
            return;
        }

        if('message' in error && 'duration' in error){
            this.toast = {
                message: error.message,
                duration: error.duration
            }
        }
    }

    public static fromJsonString(json: string){
        const object = JSON.parse(json);
        const wisebookError = new WisebookError();

        wisebookError.toast = object.toast;
        wisebookError.errorInfo = object.errorInfo;
        wisebookError.destroySession = object.destroySession;

        return wisebookError;
    }

    public shouldDestroySession(): boolean{
        if(this.destroySession) return true;
        if(!this.errorInfo) return false;

        const errorCode = this.errorInfo.code;

        return errorCode.includes(FirebasErrorTypes.DECODE_FIREBASE_ID_FAILED) ||
            errorCode.includes(FirebasErrorTypes.ID_TOKEN_EXPIRED);
    }

    public setDestroySession(value: boolean = true){
        this.destroySession = value;
    }
}