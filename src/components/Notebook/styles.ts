import styled, { css } from 'styled-components';
import { darken } from 'polished';
import InputAutoResize from 'react-input-autosize';
import Link from 'next/link';

import { boxShadow } from 'src/styles/base/mixin';

import { colors } from '@styles/base/colors';

type NotebookModelProps = {
    svgBorderColor?: string;
    svgCoverColor?: string;
};

const notebookSize = '100px';
const notebookItemsMarginInline = '2.5rem';

export const NotebookName = styled(InputAutoResize)`
    --background-color: transparent;
    --margin-items-inline: 0;
    --max-width-padding: 1rem;
    --max-width: calc(
        (${notebookItemsMarginInline} * 2) + ${notebookSize}
        - var(--max-width-padding)
    );
    
    box-sizing: border-box;
    max-width: var(--max-width);

    input {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        max-width: var(--max-width);

        color: inherit;
        background-color: var(--background-color);
        
        border-radius: 3px;
        padding-block: 2px;

        display: block;
    
        &:focus {
            ${boxShadow({ 
                color: colors.white,
                transparentizeValue: 0,
                length: '0px 0px 5px 1px',
                inset: false
            }).normal};
        }
    }
`;

export const NotebookModelLink = styled(Link).withConfig({
    shouldForwardProp: (prop) => !['svgBorderColor', 'svgCoverColor'].includes(prop)
})<NotebookModelProps>`

    width: 100px;
    height: auto;
    box-sizing: content-box;

    border-radius: 5px;

    background-color: transparent;
    cursor: pointer;

    svg {
        width: ${notebookSize};
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
    --margin-items-inline: ${notebookItemsMarginInline};
    --padding-block: 0.75rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    padding-block: var(--padding-block);

    & > * {
        margin-inline: var(--margin-items-inline);
    }

    ${({ isSelected }) => {
        if(isSelected){
            return css`
                ${NotebookModelLink.toString()}{
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