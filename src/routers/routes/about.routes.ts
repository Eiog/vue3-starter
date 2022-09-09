import { RouteRecordRaw } from 'vue-router';
const About = () => import('~/views/about/about.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: About.name,
    component: About,
    meta: {
      title: '关于',
    },
  },
];

export default routes;
