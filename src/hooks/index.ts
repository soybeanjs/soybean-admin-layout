import { ref, computed, watch, onUnmounted } from 'vue-demi';
import type { Ref, ComputedRef } from 'vue-demi';
import { CssRender } from 'css-render';
import type { CNode, CSelector, CProperties, CNodeChildren } from 'css-render';

/**
 * 使用了固定定位的布局元素添加translateX
 * @param isFixed - 是否是fixed布局
 */
export function useFixedTransformStyle(isFixed: Ref<boolean> | ComputedRef<boolean>) {
  const scrollLeft = ref(0);
  const transformStyle = computed(() => `transform: translateX(${-scrollLeft.value}px);`);

  function setScrollLeft(sLeft: number) {
    scrollLeft.value = sLeft;
  }
  function scrollHandler() {
    const sLeft = document.scrollingElement?.scrollLeft || 0;
    setScrollLeft(sLeft);
  }
  function initScrollLeft() {
    scrollHandler();
  }

  function addScrollEventListener() {
    document.addEventListener('scroll', scrollHandler);
  }

  function removeScrollEventListener() {
    document.removeEventListener('scroll', scrollHandler);
  }

  function init() {
    initScrollLeft();
    addScrollEventListener();
  }

  watch(
    isFixed,
    newValue => {
      if (newValue) {
        init();
      } else {
        removeScrollEventListener();
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    removeScrollEventListener();
  });

  return transformStyle;
}

/** 使用js渲染css */
export function useCssRender() {
  const { c } = CssRender();

  let style: CNode;

  function cssRender(selector: CSelector, props: CProperties, children: CNodeChildren = []) {
    style = c(selector, props, children);
    style.render();
    style.mount();
  }

  onUnmounted(() => {
    style?.unmount();
  });

  return {
    cssRender
  };
}
