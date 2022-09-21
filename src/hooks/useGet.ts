import useAxios from './useAxios';
import { UseAxiosReturns } from './useAxios';
export type UseGet<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
) => UseAxiosReturns<REQ, RES>;
const useGet: UseGet = (url, data) => {
  return useAxios(url, data);
};
export default useGet;
