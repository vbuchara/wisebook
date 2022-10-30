import { useWisebookStore } from "./useWisebookStore";
import type { WisebookStoreType } from './useWisebookStore';

type UseTokenRefreshIntervalType = Pick<
    WisebookStoreType, 'tokenRefreshInterval' | 'setTokenRefreshInterval'
>;

export function useTokenRefreshInterval(): UseTokenRefreshIntervalType{
    const { tokenRefreshInterval, setTokenRefreshInterval } = useWisebookStore((store) => ({ 
        tokenRefreshInterval: store.tokenRefreshInterval, 
        setTokenRefreshInterval: store.setTokenRefreshInterval 
    }));

    return { tokenRefreshInterval, setTokenRefreshInterval };
}