import { css } from 'styled-components';
import { transparentize } from 'polished';

import { colors } from './colors';

type BoxShadowMixinProps = {
    color?: string,
    transparentizeValue?: number,
    length?: string,
    inset?: boolean 
};

export const boxShadow = (props?: BoxShadowMixinProps) => {
    const {
        color, transparentizeValue, length, inset
    }: Required<BoxShadowMixinProps> = {
        color: colors.black,
        transparentizeValue: 0.8,
        length: '0px 0px 10px 5px',
        inset: true,
        ...props
    };

    const boxShadow = css`
        box-shadow: ${inset && 'inset'} ${length} ${
            transparentize(transparentizeValue)(color)
        };
    `;

    return {
        normal: boxShadow,
        onHover: css`
            &:hover {
                ${boxShadow}
            }
        `,
        onActive: css`
            &:active {
                ${boxShadow}
            }
        `,
    } as const;
};