import { DataSnapshot, get, Query } from "firebase/database";

declare module "firebase/database" {
    export function get<DataValType = any>(query: Query): Promise<WisebookDataSnapshot<DataValType>>;

    export type WisebookDataSnapshot<ValType = any> = Omit<DataSnapshot, 'val'> & {
        val(): ValType | null
    };
}