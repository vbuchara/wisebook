import { DatabaseReference, DataSnapshot, get, Query, ThenableReference } from "firebase/database";

declare module "firebase/database" {
    export function get<DataValType = any>(query: Query): Promise<WisebookDataSnapshot<DataValType>>;

    export type WisebookDataSnapshot<ValType = any> = Omit<DataSnapshot, 'val'> & {
        val(): ValType | null
    };

    export function push<DataValType = any | undefined>
        (parent: DatabaseReference, value: DataValType): ThenableReference
}