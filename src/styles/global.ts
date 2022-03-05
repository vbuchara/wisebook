import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
    }
    
    body {
        font-family: 'Ubuntu', sans-serif;
    }

    button {
        cursor: pointer;
    }
`;