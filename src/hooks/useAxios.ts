import { Ref, ref } from 'vue';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios';
export type ProgressEvent = {
  loaded: number;
  total: number;
};
type Transform<T = any> = (res: AxiosResponse) => T;
type UseAxiosoOption<REQ = any, RES = any> = {
  method?: Method;
  lazy?: boolean;
  config?: AxiosRequestConfig<REQ>;
  before?: (config: AxiosRequestConfig<REQ>) => AxiosRequestConfig<REQ>;
  after?: (response: AxiosResponse<REQ, RES>) => AxiosResponse<REQ, RES>;
  transform?: boolean | Transform<RES>;
};
export type UseAxiosReturns<REQ = any, RES = any> = {
  pending: Ref<boolean>;
  error: Ref<boolean>;
  data: Ref<RES>;
  uploadProgress: Ref<number>;
  downloadProgress: Ref<number>;
  resend: (url?: string, data?: REQ) => void;
  abort: () => void;
  onSuccess: (cb: (response: AxiosResponse<RES, REQ>) => void) => void;
  onError: (cb: (error: AxiosError<RES, REQ>) => void) => void;
};
export type UseAxios<REQ = any, RES = any> = (
  url: string,
  data?: REQ,
  option?: UseAxiosoOption<RES>,
) => UseAxiosReturns<REQ, RES>;

const _calcProgress = (progressEvent: ProgressEvent) => {
  const { loaded, total } = progressEvent;
  return Math.round((loaded / total) * 100) / 100;
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
const useAxios: UseAxios = (url, data, option) => {
  let controller = new AbortController();
  const pending = ref(true);
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
  let _onSuccess = (response: AxiosResponse): void => {
    response;
  };
  let _onError = (error: AxiosError): void => {
    error;
  };
  const _transform =
    option?.transform && isFunction(option?.transform)
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
  const instance = axios.create(_config);
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // TODO 在这里可以加上想要在请求发送前处理的逻辑
      // TODO 比如 pending 等
      pending.value = true;
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
  instance.interceptors.response.use(
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
    instance
      .request(_config)
      .then((res) => {
        responseData.value = _transform !== true ? _transform(res) : res;
        _onSuccess(res);
      })
      .catch((err) => {
        error.value = true;
        _onError(err);
      })
      .finally(() => {
        pending.value = false;
      });
  };
  send();
  return {
    pending,
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

export default useAxios;
