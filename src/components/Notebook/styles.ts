import styled, { css } from 'styled-components';

import NotebookModelSvg from '@public/notebook-model.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    padding: 1rem 2rem;

    & > svg {
        width: 100px;
    }
`;

export const NotebookModel = styled(NotebookModelSvg).withConfig({
    shouldForwardProp: (prop) => !['borderColor', 'coverColor'].includes(prop)
})<NotebookModelProps>`
    ${({ borderColor, coverColor }) => css`
        path[data-role="cover"]{
            stroke: ${borderColor};
            fill: ${coverColor};
        }

        path[data-role="border"]{
            fill: ${borderColor};
        }
    `};
`;

type NotebookModelProps = {
    borderColor?: string;
    coverColor?: string;
};