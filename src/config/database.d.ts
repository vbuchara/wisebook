declare module "@database-model" {
    export type UsuarioModel = {
        id: string,
        nome: string,
        email: string,
        url_foto: string,
        cadernos_ids?: string[],
        notas_ids?: string[],
        ativo: boolean
    }

    export type CadernoModel = {
        id: string,
        nome: string,
        paginas_ids: string[],
        configuracoes_id: string,
        ativo: boolean
    }

    export type PaginaModel = {
        id: string,
        numero_pagina: number,
        configuracoes_id: string,
        ativo: boolean,
    }

    export type NotaModel = {
        id: string,
        nome: string,
        configuracoes_id: string,
        ativo: boolean
    }

    export type ConfiguracoesModel = {
        id: string,
        entidade_id: string,
        cor_background: string,
        cor_texto: string,
        cor_linhas: string,
        tamanho_fonte: number,
        cor_capa: string
    }
}