import { createGlobalStyle } from "styled-components";
import { lighten } from 'polished';

import { animations } from "./base/animations";
import { colors } from "./base/colors";

export const GlobalStyles = createGlobalStyle`
    ${animations};

    * {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
    }
    
    html {
        height: 100%;
    }

    body {
        font-family: 'Ubuntu', sans-serif;
        height: 100%;
        background-color: ${lighten(0.1)(colors.purple_200)};

        #__next{
            height: 100%;
        }

        overflow-x: hidden;
    }

    button, input, textarea, a{
        outline-color: ${colors.purple_800};
    }

    button {
        cursor: pointer;
    }

    textarea[aria-hidden="true"]{
        line-height: 1 !important;
    }
`;