declare module "@database-model" {  
    interface WisebookModel {

    }
    
    export interface UsuarioModel extends WisebookModel{
        nome: string | null,
        email: string | null,
        url_foto: string | null,
        cadernos?: {
            [key: string]: CadernoModel,
        },
        notas?: {
            [key: string]: NotaModel,
        },
        ativo: boolean,
        privilegios: import('./enums/DatabaseEnums').UsuarioPrivilegiosEnum
    }

    export interface CadernoModel extends WisebookModel{
        nome: string,
        paginas?: {
            [key: string]: PaginaModel,
        },
        configuracoes: ConfiguracoesModel,
        ativo: boolean
    }

    export interface PaginaModel extends WisebookModel{
        numero_pagina: number,
        configuracoes: ConfiguracoesModel,
        ativo: boolean,
        text?: string, 
    }

    export interface NotaModel extends WisebookModel{
        nome: string,
        configuracoes: ConfiguracoesModel,
        ativo: boolean
    }

    export interface ConfiguracoesModel extends WisebookModel{
        cor_background?: string,
        cor_texto?: string,
        cor_linhas?: string,
        tamanho_fonte?: number,
        cor_capa?: string
    }

    export type DatabaseModelsAtributes = UsuarioModel | CadernoModel | PaginaModel 
        | NotaModel | ConfiguracoesModel;

    export type WithId<Model extends WisebookModel> = Model & {
        id: string
    }

    export type UpdateBatch<Model extends WisebookModel = WisebookModel> = 
        Record<string, Model>;
}