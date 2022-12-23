import { css } from "styled-components";

import { colors } from "../colors";
import { boxShadow } from "./boxShadow";

type ButtonMixinProps = {
    backgroundColor?: string,
    color?: string,
    borderColor?: string,
    paddingBlock?: string | number,
    paddingInline?: string | number,
};

export const button = ({
    backgroundColor,
    color,
    borderColor,
    paddingBlock,
    paddingInline
}: ButtonMixinProps) => css`
    --primary-color: ${
        typeof backgroundColor === 'string'
            ? backgroundColor
            : colors.purple_500
    };
    --secondary-color: ${
        typeof color === 'string'
        ? color
        : colors.white
    };

    --background-color: var(--primary-color);
    --color: var(--secondary-color);
    --border-color: ${
        typeof borderColor === 'string'
            ? borderColor
            : 'var(--background-color)'
    };
    --padding-block: ${
        ['string', 'number'].includes(typeof paddingBlock)
            ? paddingBlock
            : '0.2rem'
    };
    --padding-inline: ${
        ['string', 'number'].includes(typeof paddingInline)
            ? paddingInline
            : '0.5rem'
    };
    --transition: 0.1s ease-in;

    background-color: var(--background-color);
    color: var(--color);
    border: 2px solid var(--border-color);
    border-radius: 3px;

    padding-block: var(--padding-block);
    padding-inline: var(--padding-inline);

    transition: background-color var(--transition), 
        color var(--transition);

    &:hover {
        --background-color: var(--secondary-color);
        --color: var(--primary-color);
        --border-color: var(--primary-color);
    }

    ${boxShadow().onActive}
`;