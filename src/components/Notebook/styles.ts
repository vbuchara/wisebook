import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { colors } from '@styles/base/colors';

type NotebookModelProps = {
    svgBorderColor?: string;
    svgCoverColor?: string;
};

export const NotebookModelButton = styled.button.withConfig({
    shouldForwardProp: (prop) => !['svgBorderColor', 'svgCoverColor'].includes(prop)
})<NotebookModelProps>`
    width: 100px;
    height: auto;
    box-sizing: content-box;

    padding: 0.4rem;
    border-radius: 5px;

    background-color: transparent;

    svg {
        width: 100px;
        height: 100%;

        transform-origin: center;

        transition: scale 0.5s ease, translate 0.3s ease-out;

        ${({ svgBorderColor, svgCoverColor }) => css`
            path[data-role="cover"]{
                stroke: ${svgBorderColor};
                fill: ${svgCoverColor};
            }
    
            path[data-role="border"]{
                fill: ${svgBorderColor};
            }
        `};
            
        &:hover {
            scale: 1.05;
            translate: 0 -8px;
        }
    }
`;

export const ActionButtonsDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

type ContainerProps = {
    isSelected: boolean
};

export const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isSelected'].includes(prop)
})<ContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    padding-inline: 2rem;
    padding-block: 0.75rem;

    ${({ isSelected }) => {
        if(isSelected){
            return css`
                ${NotebookModelButton.toString()}{
                    cursor: default;

                    svg {
                        &:hover {
                            scale: unset;
                            translate: unset;
                        }
                    }
                }

                background-color: ${darken(0.1)(colors.purple_400)};
            `;
        }
    }}
`;