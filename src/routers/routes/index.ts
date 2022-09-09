import { RouteRecordRaw } from 'vue-router';
import indexRoutes from './index.routes';
import aboutRoutes from './about.routes';
const _routes = [...indexRoutes, ...aboutRoutes];
const routes: RouteRecordRaw[] = [
  ..._routes,
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('~/views/not-found/not-found.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];
export default routes;
