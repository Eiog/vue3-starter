import useAxios from './useAxios';
import { UseAxiosReturns } from './useAxios';
export type UseGet<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
) => UseAxiosReturns<REQ, RES>;
const useGet: UseGet = (url, data) => {
  const { token } = useAccessStore();
  return useAxios(url, data, {
    config: {
      baseURL: import.meta.env.VITE_API_BASEURL || '/',
    },
    before: (config) => {
      config.headers!['apifoxToken'] = token || '';
      return config;
    },
  });
};
export default useGet;
