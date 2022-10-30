import create from 'zustand';

export type WisebookStoreType = {
    tokenRefreshInterval: number | null,
    setTokenRefreshInterval: (tokenRefreshInterval: number) 
        => void
};

export const useWisebookStore = create<WisebookStoreType>((set, get) => ({
    tokenRefreshInterval: null,
    setTokenRefreshInterval: (tokenRefreshInterval) => {
        set(() => ({
            tokenRefreshInterval
        }));
    }
}));