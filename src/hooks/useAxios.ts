import { Ref } from 'vue';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios';
import NProgress from 'nprogress';

export type UseAxios<T = any> = (
  url: string,
  data?: unknown,
  method?: Method,
  config?: AxiosRequestConfig,
  before?: (config: AxiosRequestConfig) => void,
  after?: (response: AxiosResponse) => void,
) => {
  loading: Ref<boolean>;
  data: T;
  resend: () => void;
  onSuccess: (response: AxiosResponse) => AxiosResponse<T>;
  onError: (error: AxiosError) => AxiosError;
  abort: () => void;
  onUploadProgress: () => (progressEvent: any) => void;
  onDownloadProgress: () => (progressEvent: any) => void;
};
const _config: AxiosRequestConfig = {
  baseURL: '',
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
};
export const useAxios: UseAxios = (
  url,
  data,
  method = 'get',
  config,
  before,
  after,
) => {
  const controller = new AbortController();
  const onSuccess = (response: AxiosResponse): AxiosResponse<T> => {
    return response;
  };
  const onError = (error: AxiosError): AxiosError => {
    return error;
  };
  const onUploadProgress = (progressEvent: any): void => {};
  const onDownloadProgress = (progressEvent: any): void => {};
  const loading = ref(true);
  const responseData = ref<AxiosResponse>();
  const resend = () => {};
  const abort = () => {
    controller.abort();
  };

  Object.assign(_config, config);
  Object.assign(_config, {
    url,
    method,
    data: method !== 'GET' && method !== 'get' ? data : undefined,
    params: method === 'GET' || method === 'get' ? data : undefined,
    signal: controller.signal,
    onUploadProgress: onUploadProgress,
    onDownloadProgress: onDownloadProgress,
  });

  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // TODO 在这里可以加上想要在请求发送前处理的逻辑
      // TODO 比如 loading 等
      loading.value = true;
      before && before(config);
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  // 响应拦截器
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      after && after(response);
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  axios(_config)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
  return {
    loading,
    data: responseData,
    abort,
    resend,
    onSuccess,
    onError,
    onUploadProgress,
    onDownloadProgress,
  };
};
