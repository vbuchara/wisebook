import type { DatabaseModelsAtributes } from "@database-model";
import type { Database } from "firebase-admin/lib/database/database";
import type { Reference } from './node_modules/@firebase/database-types';

export interface WisebookDatabase extends Database {
    ref<ModelType extends DatabaseModelsAtributes>(path: string): WisebookReference<ModelType>;
}

export interface WisebookReference<ValueType extends DatabaseModelsAtributes> extends Reference {
    set(value: Omit<ValueType, 'id'>, onComplete?: (a: Error | null) => any): Promise<any>;
}

