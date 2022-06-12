import { RouteRecordRaw } from "vue-router";
import About from "@/views/about/index.vue";
const aboutRoutes: RouteRecordRaw = {
  path: "/about",
  name: About.name,
  component: About,
  meta: {
    title: "关于",
  },
};

export default aboutRoutes;
