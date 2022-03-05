import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getFetcher = function<Data = any>(url: string) { 
    return api.get<Data>(url).then(res => res.data);
};