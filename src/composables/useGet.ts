import type { UseAxiosReturns } from './useAxios'
import useAxios from './useAxios'

export type UseGet<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
) => UseAxiosReturns<REQ, RES>
const useGet: UseGet = (url, data) => {
  return useAxios(url, data, {
    config: {
      baseURL: import.meta.env.VITE_API_BASEURL || '/',
    },
    before: (config) => {
      return config
    },
  })
}
export default useGet
