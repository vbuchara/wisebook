import React, { useContext } from "react";

import type { Dispatch, SetStateAction } from 'react';

import { TokenRefreshIntervalContext } from "src/contexts/TokenRefreshIntervalContext";

export function useTokenRefreshIntervalContext(): [number | null, Dispatch<SetStateAction<number>>]{
    const [tokenRefreshInterval, setTokenRefreshInterval] = useContext(
        TokenRefreshIntervalContext
    );

    return [tokenRefreshInterval, setTokenRefreshInterval];
}