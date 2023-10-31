import useSWR from 'swr';
import axios, { AxiosRequestConfig } from 'axios';

export const API = axios.create({ 
    baseURL: (import.meta as any).env.VITE_APP_D_CORE_URL,  
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
    }, 
});  

API.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await API.get(url, { ...config });

  return res.data; 
};

export function useFetcher(pathname: string, options?: any) {   
  const { data, isLoading, error } = useSWR(pathname, fetcher, options);
  
  return {
    data,
    isLoading: isLoading || (!error && !data),
    isError: error
  }
};