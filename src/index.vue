<template>
  <div class="admin-layout" :style="style">
    <layout-header
      v-if="headerVisible"
      v-bind="commonProps"
      :fixed="fixedHeaderAndTab"
      :z-index="headerZIndex"
      :min-width="minWidth"
      :height="headerHeight"
      :padding-left="headerPaddingLeft"
      :style="headerAndTabTransform"
    >
      <slot name="header"></slot>
    </layout-header>
    <layout-tab
      v-if="tabVisible"
      v-bind="commonProps"
      :fixed="fixedHeaderAndTab"
      :z-index="tabZIndex"
      :min-width="minWidth"
      :top="headerHeight"
      :height="tabHeight"
      :padding-left="commonPaddingLeft"
      :style="headerAndTabTransform"
    >
      <slot name="tab"></slot>
    </layout-tab>
    <layout-sider
      v-if="siderVisible"
      v-bind="commonProps"
      :z-index="siderZIndex"
      :width="currentSiderWidth"
      :padding-top="siderPaddingTop"
    >
      <slot name="sider"></slot>
    </layout-sider>
    <div v-if="showMask" class="admin-layout__sider-mask" :style="siderStyle" @click="handleClickMask"></div>
    <layout-content
      v-bind="commonProps"
      :padding-top="contentPaddingTop"
      :padding-bottom="contentPaddingBottom"
      :padding-left="commonPaddingLeft"
      :overflow-hidden="addMainOverflowHidden"
    >
      <slot></slot>
    </layout-content>
    <layout-footer
      v-if="footerVisible"
      v-bind="commonProps"
      :fixed="fixedFooter"
      :z-index="footerZIndex"
      :min-width="minWidth"
      :height="footerHeight"
      :padding-left="commonPaddingLeft"
      :style="footerTransform"
    >
      <slot name="footer"></slot>
    </layout-footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CssRender } from 'css-render';
import { LayoutHeader, LayoutTab, LayoutSider, LayoutContent, LayoutFooter } from './components';
import { useFixedTransformStyle } from './hooks';

defineOptions({ name: 'AdminLayout' });

interface Props {
  /** 布局模式 */
  mode?: 'vertical' | 'horizontal';
  /** 是否是移动端 */
  isMobile?: boolean;
  /** 移动端时遮罩背景颜色 */
  maskBg?: string;
  /** 是否启用最小宽度的布局 */
  useMinWidthLayout?: boolean;
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
  /** 给主体内容添加禁止溢出 */
  addMainOverflowHidden?: boolean;
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

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  isMobile: false,
  maskBg: 'rgba(0,0,0,0.3)',
  useMinWidthLayout: false,
  minWidth: 1200,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 44,
  fixedHeaderAndTab: true,
  addMainOverflowHidden: false,
  footerVisible: true,
  footerHeight: 48,
  fixedFooter: true,
  siderVisible: true,
  siderWidth: 200,
  siderCollapsedWidth: 64,
  siderCollapse: false,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});

interface Emits {
  (e: 'update:sider-collapse', collapse: boolean): void;
}

const emit = defineEmits<Emits>();

const style = computed(() => (props.useMinWidthLayout ? `min-width:${props.minWidth}px;` : ''));

// fixed布局时，应用translateX样式(水平方向出现滚动条，拖动滚动条时，fixed元素跟着滚动)
const hasFixedEl = computed(() => props.useMinWidthLayout && (props.fixedHeaderAndTab || props.fixedFooter));
const transformStyle = useFixedTransformStyle(hasFixedEl);
const headerAndTabTransform = computed(() => (props.fixedHeaderAndTab ? transformStyle.value : ''));
const footerTransform = computed(() => (props.fixedFooter ? transformStyle.value : ''));

/** 各个子组件的公共属性 */
const commonProps = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props;
  return {
    transitionDuration,
    transitionTimingFunction
  };
});

/** 水平布局 */
const isVertical = computed(() => props.mode === 'vertical');

// fixed布局时的层级
const headerZIndex = 1001;
const tabZIndex = 999;
const siderZIndex = computed(() => (props.isMobile || isVertical.value ? 1003 : 1000));
const footerZIndex = 998;

const siderCollapseStatus = computed({
  get() {
    return props.siderCollapse;
  },
  set(collapse) {
    emit('update:sider-collapse', collapse);
  }
});
function handleClickMask() {
  siderCollapseStatus.value = true;
}

const showMask = computed(() => props.isMobile && !siderCollapseStatus.value);

const siderStyle = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props;
  const sStyle = `background-color:${props.maskBg};transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`;
  return sStyle;
});

/** 侧边宽度 */
const currentSiderWidth = computed(() => {
  const { siderWidth, siderCollapsedWidth } = props;
  const collapseWidth = props.isMobile ? 0 : siderCollapsedWidth;
  const width = siderCollapseStatus.value ? collapseWidth : siderWidth;
  return props.siderVisible ? width : 0;
});

const commonPaddingLeft = computed(() => (props.isMobile ? 0 : currentSiderWidth.value));

// 各子组件的属性
const headerPaddingLeft = computed(() => (isVertical.value ? commonPaddingLeft.value : 0));
const siderPaddingTop = computed(() =>
  !props.isMobile && !isVertical.value && props.headerVisible ? props.headerHeight : 0
);
const contentPaddingTop = computed(() => {
  let height = 0;
  if (props.fixedHeaderAndTab) {
    if (props.headerVisible) {
      height += props.headerHeight;
    }
    if (props.tabVisible) {
      height += props.tabHeight;
    }
  }
  return height;
});
const contentPaddingBottom = computed(() => (props.fixedFooter && props.footerVisible ? props.footerHeight : 0));

// css
const { c } = CssRender();
const cStyle = c(
  '.admin-layout',
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  [
    c('&__sider-mask', {
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1002,
      width: '100%',
      height: '100%',
      transitionProperty: 'background-color'
    })
  ]
);
cStyle.render();
cStyle.mount();
</script>
<style></style>
