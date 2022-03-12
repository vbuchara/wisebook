declare module "@database-model" {

    export interface UsuarioModel {
        id: string,
        nome: string | null,
        email: string | null,
        url_foto: string | null,
        cadernos_ids?: string[],
        notas_ids?: string[],
        ativo: boolean
    }

    export interface CadernoModel {
        id: string,
        nome: string,
        paginas_ids: string[],
        configuracoes_id: string,
        ativo: boolean
    }

    export interface PaginaModel {
        id: string,
        numero_pagina: number,
        configuracoes_id: string,
        ativo: boolean,
    }

    export interface NotaModel {
        id: string,
        nome: string,
        configuracoes_id: string,
        ativo: boolean
    }

    export interface ConfiguracoesModel {
        id: string,
        entidade_id: string,
        cor_background: string,
        cor_texto: string,
        cor_linhas: string,
        tamanho_fonte: number,
        cor_capa: string
    }
    export type DatabaseModelsAtributes = UsuarioModel | CadernoModel | PaginaModel 
        | NotaModel | ConfiguracoesModel;
}