import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type TokenRefreshIntervalContextType = [
    number | null,
    React.Dispatch<React.SetStateAction<number>>
];

type TokenRefreshIntervalContextProviderProps = {
    children: React.ReactNode;
};

export const TokenRefreshIntervalContext = createContext<TokenRefreshIntervalContextType>(
    {} as TokenRefreshIntervalContextType
);

export function TokenRefreshIntervalContextProvider({
    children
}: TokenRefreshIntervalContextProviderProps){
    const [tokenRefreshInterval, setTokenRefreshInterval] 
        = useState<number | null>(null);

    return (
        <TokenRefreshIntervalContext.Provider
            value={[
                tokenRefreshInterval, 
                setTokenRefreshInterval as Dispatch<SetStateAction<number>>
            ]}
        >
            {children}
        </TokenRefreshIntervalContext.Provider>
    );
}