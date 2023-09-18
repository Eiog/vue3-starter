/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.md' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}
// 声明 vite 环境变量
declare interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_BASE: string;
  readonly VITE_API_BASE_PREFIX: string
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DEV_PORT: number;
  // 更多环境变量...
}
