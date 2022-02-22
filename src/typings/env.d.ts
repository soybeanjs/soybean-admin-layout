/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue-demi';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
