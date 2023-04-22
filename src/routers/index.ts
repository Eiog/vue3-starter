import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import useGuard from './guard'
import routes from '~pages'

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE as string),
  routes,
})
/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
/** 添加路由守卫 */
useGuard(router)

export default router
