import { css } from "styled-components";

export const animations = css`
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes fade {
        from {
            opacity: 1;
        }

        to {
            opacity: 0.5;
        }
    }
`; 