import {
    Container,
    NotebookModel
} from './styles';

import type { CadernoModel } from "@database-model";

type NotebookProps = {
    id: string
    caderno: CadernoModel
};

export function Notebook({ id, caderno }: NotebookProps) {
    return (
        <Container>
            <NotebookModel
                borderColor={caderno.configuracoes?.cor_capa}
                coverColor={caderno.configuracoes?.cor_capa}
            />
            <h1>{caderno.nome}</h1>
        </Container>
    );
}