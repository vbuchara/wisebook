import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { colors } from "@styles/colors";

const vars = {
    loginButton: colors.red,
    loginText: colors.white,
} as const;

type LoginButtonStyleProps = {
    isLoading: boolean
};

export const LoginButtonStyle = styled.button<LoginButtonStyleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    padding: clamp(0.6rem, 1vh, 2.6rem) clamp(1rem, 1vw, 3rem);

    border-radius: 0.4vw;
    background-color: ${vars.loginButton};
    
    h1 {
        font-size: clamp(1rem, 1.8vw, 3rem);
        color: ${vars.loginText};
    }

    .loading-spinner {
        height: clamp(1rem, 1.8vw, 3rem);
        position: absolute;
    }

    ${({ isLoading }) => {
        if(isLoading) {
            return css`
                pointer-events: none;

                & > h1, & > .google-logo{
                    visibility: hidden;
                    pointer-events: none;
                }
            `;
        };
            
        return css`
            .loading-spinner {
                display: none;
                visibility: hidden;
                pointer-events: none;
            }
        `;
    }}

    @media(max-width: 650px) {
        overflow: hidden;
        
        h1 {
            max-width: 2.8rem;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: clip;
        }
    }
`;

export const FontAweIcon = styled(FontAwesomeIcon)`
    height: clamp(1rem, 1.8vw, 3rem);

    path {
        fill: ${vars.loginText};
    }
`;