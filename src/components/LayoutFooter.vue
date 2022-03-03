<template>
  <footer class="soybean-admin-layout__footer" :style="style">
    <slot></slot>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi';
import { useCssRender } from '@/hooks';

interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** fixed布局的层级 */
  zIndex?: number;
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  zIndex: 999,
  minWidth: 1200,
  height: 56,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});

const { cssRender } = useCssRender();

const style = computed(() => {
  const { fixed, zIndex, minWidth, height, paddingLeft, transitionDuration, transitionTimingFunction } = props;
  const position = fixed ? 'fixed' : 'static';
  return `position: ${position};z-index: ${zIndex};min-width: ${minWidth}px;height: ${height}px;padding-left: ${paddingLeft}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`;
});

// css
cssRender('.soybean-admin-layout__footer', {
  left: 0,
  bottom: 0,
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '100%',
  transitionProperty: 'padding-left'
});
</script>
<style></style>
