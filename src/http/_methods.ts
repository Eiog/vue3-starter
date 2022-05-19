import { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
const pending = new Map()
let loading = 0
export const addPending = function (config: AxiosRequestConfig) {
    const controller = new AbortController();
    config.signal = controller.signal
    if (!pending.has(config.url)) {
        pending.set(config.url, controller)
    }
    console.log(pending);

}
export const removePending = function (config: AxiosRequestConfig) {
    if (pending.has(config.url)) {
        const controller = pending.get(config.url)
        controller.abort()
        pending.delete(config.url)
    }
}

export const loadingStart = function (config: AxiosRequestConfig) {
    loading+=1
    if(loading>=1){
        NProgress.start()
    }
}
export const loadingDone = function () {
    loading-=1
    if(loading=0){
        NProgress.done()
    }
}