// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'home',
        component:()=>import('@/views/home/index.vue')
    }
];

export default asyncRoutes;
