declare module "@database-model" {    
    export interface UsuarioModel {
        nome: string | null,
        email: string | null,
        url_foto: string | null,
        cadernos?: {
            [key: string]: CadernoModel,
        }[],
        notas?: {
            [key: string]: NotaModel,
        }[],
        ativo: boolean,
        privilegios: import('./DatabaseEnums').UsuarioPrivilegiosEnum
    }

    export interface CadernoModel {
        nome: string,
        paginas?: {
            [key: string]: PaginaModel,
        }[],
        configuracoes: ConfiguracoesModel,
        ativo: boolean
    }

    export interface PaginaModel {
        numero_pagina: number,
        configuracoes: ConfiguracoesModel,
        ativo: boolean,
    }

    export interface NotaModel {
        nome: string,
        configuracoes: ConfiguracoesModel,
        ativo: boolean
    }

    export interface ConfiguracoesModel {
        cor_background?: string,
        cor_texto?: string,
        cor_linhas?: string,
        tamanho_fonte?: number,
        cor_capa?: string
    }

    export type DatabaseModelsAtributes = UsuarioModel | CadernoModel | PaginaModel 
        | NotaModel | ConfiguracoesModel;
}