import { mix } from "polished";

export const colors = {
    purple_800: '#15045b',
    purple_600: '#3a288e',
    purple_500: '#4731AD',
    purple_400: '#926bc0',
    purple_200: '#ca97cd',

    purple_gradient: `linear-gradient(
        90deg, rgba(21,4,91,1) 0%, 
        rgba(58,40,142,1) 50%, 
        rgba(146,107,192,1) 100%
    )`,
    purple_400_gradient: `linear-gradient(
        90deg, rgba(146,107,192,1) 0%, 
        rgba(90,66,119,1) 50%, 
        rgba(146,107,192,1) 100%
    )`,

    red: '#EA4335',

    red_error: '#FB1A1A',
    green_success: '#28D824',
    blue_info: '#0FA5FA',
    yellow_warning: '#FFD600',

    black: '#000',
    white: '#fff',
    gray_400: '#818181',
    gray_600: '#333',
} as const;