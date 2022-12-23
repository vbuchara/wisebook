import { colors } from '@styles/base/colors';

import type { ConfiguracoesModel, CadernoModel, PaginaModel } from '@database-model';

const { purple_600 } = colors;

export const DefaultConfiguracoes = {
    cor_background: '#F2EE92',
    cor_linhas: '#797474',
    cor_texto: '#000',
    tamanho_fonte: 16,
    cor_capa: purple_600
} as const satisfies ConfiguracoesModel;

export const DefaultPagina = {
    numero_pagina: 1,
    ativo: true,
    configuracoes: DefaultConfiguracoes
} as const satisfies PaginaModel;

export const DefaultCaderno = {
    nome: 'Caderno 1',
    ativo: true,
    configuracoes: DefaultConfiguracoes
} as const satisfies CadernoModel;