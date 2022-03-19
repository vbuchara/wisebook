import { createGlobalStyle } from "styled-components";
import { animations } from "./animations";
import { colors } from "./colors";

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
        background-color: ${colors.purple_200};

        #__next{
            height: 100%;
        }
    }

    button {
        cursor: pointer;
    }
`;