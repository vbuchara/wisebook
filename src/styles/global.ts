import styled, { createGlobalStyle } from "styled-components";
import { lighten } from 'polished';
import { ToastContainer } from "react-toastify";

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
        background-color: ${lighten(0.1)(colors.purple_200)};

        #__next{
            height: 100%;
        }

        overflow-x: hidden;
    }

    button {
        cursor: pointer;
    }
`;

export const WisebookToastContainer = styled(ToastContainer)`
    &&&.Toastify__toast-container {

    }

    .Toastify__toast {
        background-color: ${colors.purple_200};
        color: ${colors.purple_600};
        font-weight: 600;

        &:hover {
            box-shadow: 0px 0px 5px 1px #FFFFFF;
        }
    }

    .Toastify__toast-body {

    }

    .Toastify__progress-bar {
        background-color: ${colors.purple_800};
    }

    .Toastify__progress-bar--default {
        background: ${colors.purple_gradient};
    }

    .Toastify__toast-icon {
        svg {
            transform: scale(1.5);
        }
    }
`;