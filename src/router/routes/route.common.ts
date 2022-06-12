// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
export const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        redirect: "/not-found"
    }
];

