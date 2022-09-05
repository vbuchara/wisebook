declare module "@utils" {
    export type ExcludeString<
        ExcludeList extends string,
        T = string, 
    > = T extends ExcludeList ? never : T; 
}