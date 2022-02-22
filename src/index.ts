import type { App } from 'vue-demi';
import SoybeanAdminLayout from './index.vue';

function install(app: App) {
  app.component('SoybeanAdminLayout', SoybeanAdminLayout);
}

SoybeanAdminLayout.install = install;

export default SoybeanAdminLayout;
