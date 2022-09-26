
export const fontSizes = {
    clampBase: (
        min = '1.2rem', 
        value = '1.2vw', 
        max = '2.8rem'
    ) => `clamp(${min}, ${value}, ${max})` as const,
};