import { RouteRecordRaw } from 'vue-router';
const Index = () => import('~/views/index/index.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: Index.name,
    component: Index,
    meta: {
      title: '首页',
    },
  },
];

export default routes;
