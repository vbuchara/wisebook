import type { DatabaseModelsAtributes } from '@database-model';
import type { Database } from "firebase-admin/lib/database/database";
import type { Reference, DataSnapshot, ThenableReference } from '../../node_modules/@firebase/database-types';

export interface WisebookDatabase extends Database {
    ref<ModelType extends DatabaseModelsAtributes>(path: string): WisebookReference<ModelType>;
}

export interface WisebookReference<ValueType extends DatabaseModelsAtributes> extends Reference {
    set(value: ValueType, onComplete?: (a: Error | null) => any): Promise<any>;
    transaction(
        transactionUpdate: (a: ValueType | null) => ValueType | undefined | null,
        onComplete?: (a: Error | null, b: boolean, c: DataSnapshot | null) => any,
        applyLocally?: boolean
    ): Promise<ValueType | Error>;
    push(
        value?: ValueType, 
        onComplete?: (a: Error | null) => any
    ): WisebookThenableReference<ValueType>;
}

export interface WisebookThenableReference<ValueTypeRef extends DatabaseModelsAtributes> extends ThenableReference {
    set<ValueType extends DatabaseModelsAtributes = ValueTypeRef>(
        value: ValueType, 
        onComplete?: (a: Error | null) => any
    ): Promise<any>;

    transaction<ValueType extends DatabaseModelsAtributes = ValueTypeRef>(
        transactionUpdate: (a: ValueType | null) => ValueType | undefined | null,
        onComplete?: (a: Error | null, b: boolean, c: DataSnapshot | null) => any,
        applyLocally?: boolean
    ): Promise<ValueType | Error>;

    push<ValueType extends DatabaseModelsAtributes = ValueTypeRef>(
        value?: ValueType, 
        onComplete?: (a: Error | null) => any
    ): WisebookThenableReference<ValueType>;

    child<ValueType extends DatabaseModelsAtributes = ValueTypeRef>(
        path: string
    ): WisebookReference<ValueType>;
}