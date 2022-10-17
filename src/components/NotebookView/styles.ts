import styled, { css } from 'styled-components';

import { ActionButton } from '../ActionButton';

import { colors } from '@styles/base/colors';
import { boxShadow } from '@styles/base/mixin';

import PageModel from '@public/page-model.svg';

export const NotebookPageControlContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    padding-block: 0.5rem;
`;

export type PageSelectedControlButtonProps = {
    type: "previous" | "next" | "add",
    disabled?: boolean
};

export const PageSelectedControlButton = styled(ActionButton)<PageSelectedControlButtonProps>`
    &&{
        ${({ type }) => {
            if(type === "add"){
                return css`
                    --primary-color: ${colors.blue_info};
                    --secondary-color: ${colors.white};
                `;
            }

            return "";
        }}

        ${({ disabled }) => {
            if(!disabled) return "";

            return css`
                cursor: not-allowed;

                --background-color: var(--secondary-color);
                --color: var(--primary-color);

                &:hover {
                    box-shadow: none;
                }
            `;
        }}
    }
`;

type NotebookPageSvgProps = {
    pageColor?: string,
    linesColor?: string,
    mainLineColor?: string
};

export const NotebookPageSvg = styled(PageModel).withConfig({
    shouldForwardProp: (prop) => !['pageColor', "linesColor", 'mainLineColor'].includes(prop)
})<NotebookPageSvgProps>`
    height: 100%;
    width: 100%;

    ${({ pageColor, linesColor, mainLineColor }) => {
        return css`
            path[data-role="page"]{
                fill: ${pageColor}
            }

            path[data-role="lines"]{
                fill: ${linesColor}
            }

            path[data-role="main-line"]{
                stroke: ${mainLineColor};
            }
        `;
    }}
`; 

export const NotebookPageInfo = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    input {
        padding-inline: 0.5ch;
        width: 3ch;
        border-radius: 5px;

        color: ${colors.purple_800};

        text-align: end;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button
        {
            -webkit-appearance: none;
        }
    }
`;

export const NotebookPageWrapper = styled.div`
    --scale-ratio: 0.8;

    width: calc(300px * var(--scale-ratio));
    height: calc(500px * var(--scale-ratio));

    transform-origin: center;

    position: relative;

    .page-textarea-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;

        overflow: hidden;

        background-color: transparent;

        padding-inline: 2px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        cursor: text;

        &:focus,
        &:focus-visible,
        &:focus-within 
        {
            ${boxShadow({ 
                color: colors.white,
                transparentizeValue: 0,
                length: '0px 0px 10px 5px',
                inset: false
            }).normal};

            outline: none;
        }

        textarea {
            height: auto;

            font-size: calc(20px * var(--scale-ratio));
            line-height: 1;

            background-color: transparent;
            color: ${colors.purple_800};
            caret-color: ${colors.purple_800};

            resize: none;
            overflow: hidden;
            tab-size: 5;

            &:focus,
            &:focus-visible,
            &:focus-within 
            {
                outline: none;
            }
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > ${NotebookPageInfo.toString()} {
        margin-top: 0.75rem;
    }

    & > ${NotebookPageControlContainer.toString()} {
        align-self: stretch;
    }
`;