import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ActionButton } from '../ActionButton';
import { NotebookDeleteButton } from '../NotebookDeleteButton';

import {
    ActionButtonsDiv,
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
            <button>
                <NotebookModel
                    borderColor={caderno.configuracoes?.cor_capa}
                    coverColor={caderno.configuracoes?.cor_capa}
                />
            </button>
            <h1>{caderno.nome}</h1>
            <ActionButtonsDiv>
                <NotebookDeleteButton
                    id={id}
                    name={caderno.nome}
                />
                <ActionButton
                    icon={solid('gear')}
                    tooltipText="Configurar Caderno"
                />
            </ActionButtonsDiv>
        </Container>
    );
}