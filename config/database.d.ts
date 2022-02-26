declare module "@types/database" {
    export type Usuario = {
        id: string,
        nome: string,
        email: string,
        url_foto: string,
        cadernos_ids: string[]
    }
}