import type { App } from 'vue-demi';
import SoybeanAdminLayout from './index.vue';

function install(app: App) {
  app.component('SoybeanAdminLayout', SoybeanAdminLayout);
}

SoybeanAdminLayout.install = install;

export interface LayoutProps {
  /** 布局模式 */
  mode?: 'vertical' | 'horizontal';
  /** 最小宽度 */
  minWidth?: number;
  /** 头部可见 */
  headerVisible?: boolean;
  /** 头部高度 */
  headerHeight?: number;
  /** 标签可见 */
  tabVisible?: boolean;
  /** 标签页高度 */
  tabHeight?: number;
  /** 固定头部和标签 */
  fixedHeaderAndTab?: boolean;
  /** 底部可见 */
  footerVisible?: boolean;
  /** 底部高度 */
  footerHeight?: number;
  /** 固定底部 */
  fixedFooter?: boolean;
  /** 侧边可见 */
  siderVisible?: boolean;
  /** 侧边栏高度 */
  siderWidth?: number;
  /** 侧边栏折叠状态的高度 */
  siderCollapsedWidth?: number;
  /** 侧边栏折叠状态 */
  siderCollapse?: boolean;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡速度曲线 */
  transitionTimingFunction?: string;
}

export default SoybeanAdminLayout;
