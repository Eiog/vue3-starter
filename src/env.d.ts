/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 声明 vite 环境变量
declare interface ImportMetaEnv {
  readonly VITE_BASE: string;
  readonly VITE_API_BASEURL: string;
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}
