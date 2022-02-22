<template>
  <soybean-admin-layout>
    <template #header>
      <div class="header">Header</div>
    </template>
    <template #tab>
      <div class="tab">Tab</div>
    </template>
    <template #sider>
      <div class="sider">Sider</div>
    </template>
    <template #footer>
      <div class="footer">Footer</div>
    </template>
    <div></div>
  </soybean-admin-layout>
</template>

<script setup lang="ts">
import SoybeanAdminLayout from './index.vue';
</script>

<style>
body {
  margin: 0;
}
.header {
  height: 100%;
  background-color: rgb(255, 139, 104);
}
.tab {
  height: 100%;
  background-color: rgb(255, 227, 104);
}
.sider {
  height: 100%;
  background-color: rgb(70, 247, 232);
}
.footer {
  height: 100%;
  background-color: rgb(70, 153, 247);
}
</style>
