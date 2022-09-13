import { Ref } from 'vue';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios';
type ProgressEvent = {
  loaded: number;
  total: number;
};
type Transform<T = any> = (res: AxiosResponse) => T;
type UseAxiosoOption<REQ = any, RES = any> = {
  method?: Method;
  config?: AxiosRequestConfig<REQ>;
  before?: (config: AxiosRequestConfig<REQ>) => AxiosRequestConfig<REQ>;
  after?: (response: AxiosResponse<REQ, RES>) => AxiosResponse<REQ, RES>;
  transform?: boolean | Transform<RES>;
};
export type UseAxiosReturns<REQ = any, RES = any> = {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  data: Ref<RES>;
  uploadProgress: Ref<number>;
  downloadProgress: Ref<number>;
  resend: (url?: string, data?: REQ) => void;
  abort: () => void;
  onSuccess: (cb: (response: AxiosResponse) => void) => void;
  onError: (cb: (error: AxiosError) => void) => void;
};
export type UseAxios<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
  option?: UseAxiosoOption<RES>,
) => UseAxiosReturns<REQ, RES>;
export type UseGet<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
) => UseAxiosReturns<REQ, RES>;
export type UsePost<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
) => UseAxiosReturns<REQ, RES>;

const _config: AxiosRequestConfig = {
  baseURL: '',
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
};
export const useAxios: UseAxios = (url, data, option) => {
  let controller = new AbortController();
  const loading = ref(true);
  const error = ref(false);
  const responseData = ref();
  const progress = ref(0);
  const uploadProgress = ref(0);
  const downloadProgress = ref(0);
  const resend = (url?: string, data?: any) => {
    controller = new AbortController();
    send(url, data);
  };
  const abort = () => {
    controller.abort();
  };
  const onUploadProgress = (progressEvent: ProgressEvent): void => {
    uploadProgress.value = _calcProgress(progressEvent);
    progress.value = _calcProgress(progressEvent);
  };
  const onDownloadProgress = (progressEvent: ProgressEvent): void => {
    downloadProgress.value = _calcProgress(progressEvent);
    progress.value = _calcProgress(progressEvent);
  };
  let _onSuccess = (response: AxiosResponse): void => {};
  let _onError = (error: AxiosError): void => {};
  const _transform =
    option?.transform && _isFunction(option?.transform)
      ? option.transform
      : (res: AxiosResponse) => {
          return res.data;
        };

  Object.assign(_config, option?.config);
  Object.assign(_config, {
    url,
    method: option?.method ? option?.method : 'get',
    signal: controller.signal,
    data:
      option?.method !== 'GET' && option?.method !== 'get' ? data : undefined,
    params:
      option?.method === 'GET' || option?.method === 'get' ? data : undefined,
    onUploadProgress: onUploadProgress,
    onDownloadProgress: onDownloadProgress,
  });

  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // TODO 在这里可以加上想要在请求发送前处理的逻辑
      // TODO 比如 loading 等
      loading.value = true;
      error.value = false;
      progress.value = 0;
      uploadProgress.value = 0;
      downloadProgress.value = 0;
      responseData.value = undefined;
      config = option?.before ? option?.before(config) : config;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  // 响应拦截器
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      response = option?.after ? option?.after(response) : response;

      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  const send = (url?: string, data?: any) => {
    _config.url = url || _config.url;
    _config.signal = controller.signal;
    _config.data = data
      ? _config.method !== 'GET' && _config.method !== 'get'
        ? data
        : undefined
      : _config.data;
    _config.params = data
      ? _config.method === 'GET' || _config.method === 'get'
        ? data
        : undefined
      : _config.data;
    axios(_config)
      .then((res) => {
        responseData.value = _transform(res);
        _onSuccess(res);
      })
      .catch((err) => {
        error.value = true;
        _onError(err);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  send();
  return {
    loading,
    data: responseData,
    progress,
    uploadProgress,
    downloadProgress,
    error,
    abort,
    resend,
    onSuccess: (cb: (data: AxiosResponse) => void) => {
      _onSuccess = cb;
    },
    onError: (cb: (error: AxiosError) => void) => {
      _onError = cb;
    },
  };
};
export const useGet: UseGet = (url, data) => {
  return useAxios(url, data);
};
export const usePost: UsePost = (url, data) => {
  return useAxios(url, data, {
    method: 'post',
  });
};
const _calcProgress = (progressEvent: ProgressEvent) => {
  const { loaded, total } = progressEvent;
  return Math.round((loaded / total) * 100) / 100;
};
function _isFunction(input: unknown): input is Function {
  return '[object Function]' === Object.prototype.toString.call(input);
}
