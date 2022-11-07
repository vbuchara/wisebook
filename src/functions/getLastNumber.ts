export const lastNumbersRegex = /[0-9]+$/mg;

export function getLastNumber(text: string): number | undefined{
    const lastNumbersRegex = /[0-9]+$/mg;
    const countNumber: string | undefined = lastNumbersRegex.exec(text)?.pop();

    return countNumber ? Number(countNumber) : undefined;
}