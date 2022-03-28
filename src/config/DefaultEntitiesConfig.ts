import { ConfiguracoesModel, CadernoModel, PaginaModel } from '@database-model';

export const DefaultCadernoConfiguracoes: ConfiguracoesModel = {

}

export const DefaultPaginaConfiguracoes: ConfiguracoesModel = {
    cor_background: '#F2EE92',
    cor_linhas: '#797474',
    cor_texto: '#000',
    tamanho_fonte: 16,
} 

export const DefaultPagina: PaginaModel = {
    numero_pagina: 1,
    ativo: true,
    configuracoes: DefaultPaginaConfiguracoes
}

export const DefaultCaderno: CadernoModel = {
    nome: 'Caderno 1',
    ativo: true,
    configuracoes: DefaultCadernoConfiguracoes
}