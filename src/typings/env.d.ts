/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue-demi';

  const component: DefineComponent<object, object, any>;
  export default component;
}
