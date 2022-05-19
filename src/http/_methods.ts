import { AxiosRequestConfig } from 'axios'
const pending = new Map()
export const addPending = function (config: AxiosRequestConfig) {
    const controller = new AbortController();
    config.signal = controller.signal
    if (!pending.has(config.url)) {
        pending.set(config.url, controller)
    }
}
export const removePending = function (config: AxiosRequestConfig) {
    if (pending.has(config.url)) {
        const controller = pending.get(config.url)
        controller.abort()
        pending.delete(config.url)
    }
}