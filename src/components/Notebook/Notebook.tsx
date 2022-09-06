import NotebookModel from '@public/notebook-model.svg';

import {
    Container
} from './styles';

import type { CadernoModel } from "@database-model";

type NotebookProps = {
    id: string
    caderno: CadernoModel
};

export function Notebook({ id, caderno }: NotebookProps) {
    return (
        <Container>
            <NotebookModel/>
            <h1>{caderno.nome}</h1>
        </Container>
    );
}