import * as allStyled from 'styled-components';

import type { FlattenSimpleInterpolation } from "styled-components";

interface ClipPathShapesStyle extends FlattenSimpleInterpolation {
    default: FlattenSimpleInterpolation
};

type ClipPathShapesReturn = Record<string, ClipPathShapesStyle>;

const css = allStyled.css;

export const clipPathShapes = {
    get cross(){
        const style = css`
            clip-path: polygon(
                20% 0%, 0% 20%, 
                30% 50%, 0% 80%, 
                20% 100%, 
                50% 70%, 
                80% 100%, 
                100% 80%, 
                70% 50%, 
                100% 20%, 
                80% 0%, 
                50% 30%
            );
        `;
        
        const defaultStyle = {
            default: css`
                clip-path: polygon(
                    20% -10%, -10% -10%, 
                    -10% 50%, -10% 110%, 
                    20% 110%, 
                    50% 110%, 
                    80% 110%, 
                    110% 110%, 
                    110% 50%, 
                    110% -10%, 
                    80% -10%, 
                    50% -10%
                );
            `
        };

        return Object.assign([...style], defaultStyle);
    },
    get circle(){
        const style = css`
            clip-path: circle(50% at 50% 50%);
        `;

        const defaultStyle = {
            default: css`
                clip-path: circle(200% at 200% 200%);
            `
        };

        return Object.assign([...style], defaultStyle);
    },
} satisfies ClipPathShapesReturn;