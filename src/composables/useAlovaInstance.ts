import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

export const useAlovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASEURL || '',

  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),
  beforeRequest: (method) => {
    method.config.headers.token = 'token'
  },
  // 全局的响应拦截器
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response) => {
      if (response.status >= 400)
        throw new Error(response.statusText)

      return response.json()
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (error) => {
      throw new Error(error)
    },
  },

})
