import styled, { css } from 'styled-components';

import NotebookModelSvg from '@public/notebook-model.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    & > button > svg {
        width: 100px;
        height: 100%;
    }

    & > button {
        width: 100px;
        height: auto;
        box-sizing: content-box;
        background-color: transparent;
    }
`;

type NotebookModelProps = {
    borderColor?: string;
    coverColor?: string;
};

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

export const ActionButtonsDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;