import styled from 'styled-components';
import { ToastContainer } from "react-toastify";
import { darken, lighten } from 'polished';

import { colors } from '@styles/base/colors';

export const WisebookToastContainer = styled(ToastContainer)`
    &&&.Toastify__toast-container {

    }

    .Toastify__toast {
        background-color: ${colors.purple_200};
        color: ${colors.purple_600};
        font-weight: 600;

        &:hover {
            box-shadow: 0px 0px 5px 1px ${colors.white};
        }
    }

    .Toastify__toast-body {
        padding: 0px 6px;
    }

    .Toastify__progress-bar {
        background-color: ${colors.purple_800};
    }

    .Toastify__progress-bar--default {
        background: ${colors.purple_gradient};
    }

    .Toastify__toast-icon {
        width: auto;

        svg.toast-icon{
            transform: scale(1);
        }
    }

    .Toastify__close-button {
        color: ${colors.purple_600};   
    }

    .Toastify__toast--error {
        background-color: ${
            lighten(0.25)(colors.red_error)
        };

        .Toastify__progress-bar {
            background-color: ${colors.red_error};
        }
    }

    .Toastify__toast--success {
        background-color: ${
            lighten(0.25)(colors.green_success)
        };

        .Toastify__progress-bar {
            background-color: ${
                darken(0.05)(colors.green_success)
            };
        }
    }

    .Toastify__toast--info {
        background-color: ${
            lighten(0.25)(colors.blue_info)
        };

        .Toastify__progress-bar {
            background-color: ${colors.blue_info};
        }
    }

    .Toastify__toast--warning {
        background-color: ${
            lighten(0.25)(colors.yellow_warning)
        };

        .Toastify__progress-bar {
            background-color: ${colors.yellow_warning};
        }
    }
`;