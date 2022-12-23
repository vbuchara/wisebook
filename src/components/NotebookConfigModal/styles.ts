import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { WisebookModal } from '../WisebookModal';

import { TriggerButton } from '../ColorPicker/styles';

import { colors } from '@styles/base/colors';
import { button, clipPathShapes } from '@styles/base/mixin';


export const CancelButton = styled.button`
    ${button({
        backgroundColor: colors.red,
        color: colors.white,
        paddingBlock: '0.3rem'
    })}
`;

export const SaveButton = styled.button`
     ${button({
        backgroundColor: colors.green_success,
        color: colors.white,
        paddingBlock: '0.3rem'
    })}
`;

export const ButtonsDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    margin-top: 1rem;
`;

interface ConfigFormLabelProps {
    pickedColor?: string,
    isValid?: boolean,
    isDisabled?: boolean
}

interface DefaultConfigFormLabelProps extends ConfigFormLabelProps {
    pickedColor?: undefined,
    isValid?: boolean
}

interface ColorPickerConfigFormLabelProps extends ConfigFormLabelProps {
    pickedColor: string,
    isValid: boolean
}

export const ConfigFormLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => ![
        'pickedColor', 'isValid', 'isDisabled'
    ].includes(prop),
})<DefaultConfigFormLabelProps | ColorPickerConfigFormLabelProps>`
    --color-picked-size: 1rem;
    --color-picked-right: 0.5rem;

    --input-primary-color: ${
        ({ isValid }) => isValid === false
            ? colors.red_error
            : colors.purple_800
    };
    --input-background-color: ${colors.white};
    --color: ${colors.purple_800};
    
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: 
        "label label"
        "input extra"
    ;

    position: relative;

    color: var(--color);

    & > span {
        grid-area: label;

        margin-block: auto;

        white-space: nowrap;
    }

    & > input {
        --width: 100%;
        --color: inherit;
        --padding-left: 0.5ch;
        --padding-right: calc(
            var(--color-picked-size) + (2 * var(--color-picked-right))
        );

        grid-column-start: input;
        grid-column-end: extra;
        grid-row-start: input;
        grid-row-end: input;
        box-sizing: content-box;

        width: calc(
            var(--width) - var(--input-border-width)
            - var(--padding-right) - var(--padding-left)
        );
        height: calc(
            var(--input-font-size) + (var(--input-padding-block) * 2)
        );

        padding-left: var(--padding-left);
        padding-right: var(--padding-right);

        border-top-left-radius: var(--input-border-radius);
        border-bottom-left-radius: var(--input-border-radius);
        border-top-right-radius: var(--input-border-radius);
        border-bottom-right-radius: var(--input-border-radius);

        border-top-width: var(--input-border-width);
        border-bottom-width: var(--input-border-width);
        border-left-width: var(--input-border-width);
        border-right-width: var(--input-border-width);
        
        border-style: solid;
        border-color: var(--input-primary-color);
        outline-color: ${colors.black};
        background-color: var(--input-background-color);
        color: var(--color);

        &.color-input {
            grid-column-start: input;
            grid-column-end: input;

            border-right-width: 0;
            border-top-right-radius: 0;  
            border-bottom-right-radius: 0;
        }
    }

    & > ${TriggerButton.toString()} {
        --svg-size: var(--input-font-size);
        --padding-block: var(--input-padding-block);
        --border-width: 0;
        --primary-color: var(--input-primary-color);

        grid-column-start: extra;
        grid-column-end: extra;
        grid-row-start: extra;
        grid-row-end: extra;

        border-top-right-radius: var(--input-border-radius);
        border-bottom-right-radius: var(--input-border-radius);

        border-top-width: var(--input-border-width);
        border-bottom-width: var(--input-border-width);
        border-left-width: var(--input-border-width);
        border-right-width: var(--input-border-width);

        outline-color: ${colors.black};
    }

    ${({ pickedColor, isValid }) => pickedColor ? css`
        --primary-color: ${
            isValid
                ? pickedColor
                : colors.red_error
        };

        &::before {
            --border-color: ${
                isValid
                    ? colors.black
                    : 'transparent'
            };

            content: "";
            box-sizing: border-box;
            transition: background-color 0.3s ease,
                clip-path 0.3s ease;

            grid-column-start: input;
            grid-column-end: input;
            grid-row-start: input;
            grid-row-end: input;
            justify-self: center;
            align-self: center;

            width: var(--color-picked-size);
            height: var(--color-picked-size);
            
            position: absolute;
            left: auto;
            right: var(--color-picked-right);

            border-width: 1px;
            border-style: solid;
            border-color: var(--border-color);
            border-radius: 2px;

            background-color: var(--primary-color);

            ${
                !isValid
                    ? clipPathShapes.cross 
                    : clipPathShapes.cross.default
            };
        }
    ` : ''};

    ${({ isDisabled }) => isDisabled ? css`
        --color: ${colors.gray_600};
        --input-primary-color: ${colors.gray_600};
        --primary-color: ${colors.gray_600};
        --input-background-color: ${
            darken(0.15)(colors.white)
        };

        cursor: not-allowed;

        & > input, & > ${TriggerButton.toString()} {
            pointer-events: none;
        }
    ` : ''};
`;

export const ConfigForm = styled.form`
    --input-border-width: 2px;
    --input-font-size: 1rem;
    --input-padding-block: 0.3rem;
    --input-border-radius: 2px;

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    align-items: center;
    row-gap: 1rem;
    column-gap: 2rem;

    padding-block-start: 0.5rem;
    padding-block-end: 1.5rem;
    padding-inline: 2rem;

    ${ButtonsDiv.toString()}{
        grid-column: 1 / 3;
    }
`;

export const Header = styled.div`
    --font-size: 1.3em; 
    --background-color: ${colors.white};

    display: flex;

    padding-inline: 0.5rem;
    padding-block: 0.5rem;

    background-color: var(--modal-color);

    h2 {
        color: ${colors.white};

        font-size: var(--font-size);
        line-height: 1;
        white-space: nowrap;
    }
`;

export const ConfigModal = styled(WisebookModal)`&& {
    --modal-color: ${colors.purple_800};
    --background-color: ${colors.white};
    --padding: unset;
    --top: 40%;

    border: 3px solid var(--modal-color);
}`;