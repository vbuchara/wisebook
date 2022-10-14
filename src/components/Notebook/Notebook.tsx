import { useRouter } from 'next/router';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ActionButton } from '../ActionButton';
import { NotebookDeleteButton } from '../NotebookDeleteButton';

import NotebookModelSvg from '@public/notebook-model.svg';

import {
    ActionButtonsDiv,
    Container,
    NotebookModelButton
} from './styles';

import type { CadernoModel } from "@database-model";
import type { MouseEvent } from 'react';

type NotebookProps = {
    id: string
    caderno: CadernoModel,
    isSelected?: boolean
};

export function Notebook({ id, caderno, isSelected }: NotebookProps) {
    const router = useRouter();
    
    function handleNotebookOnClick(event: MouseEvent<HTMLButtonElement>){
        if(isSelected) return;
        const formattedName = caderno.nome.replace(" ", "").toLowerCase();

        router.push(`/cadernos/${formattedName}`);
    }

    return (
        <Container
            isSelected={Boolean(isSelected)}
        >
            <NotebookModelButton
                onClick={handleNotebookOnClick}
                svgBorderColor={caderno.configuracoes?.cor_capa}
                svgCoverColor={caderno.configuracoes?.cor_capa}
            >
                <NotebookModelSvg/>
            </NotebookModelButton>
            <h1>{caderno.nome}</h1>
            <ActionButtonsDiv>
                <NotebookDeleteButton
                    id={id}
                    name={caderno.nome}
                    isSelected={Boolean(isSelected)}
                />
                <ActionButton
                    icon={solid('gear')}
                    tooltipText="Configurar Caderno"
                />
            </ActionButtonsDiv>
        </Container>
    );
}