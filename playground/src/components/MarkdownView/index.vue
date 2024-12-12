<!-- 展示markdown内容组件 -->
<script setup>
import { markRaw, onMounted, reactive, toRefs } from 'vue';

import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter'; // 解析前题
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight'; // 代码高亮
import mediumZoom from '@bytemd/plugin-medium-zoom'; // 缩放图片
import { Viewer } from '@bytemd/vue-next';
import zhHans from 'bytemd/locales/zh_Hans.json';

import 'bytemd/dist/index.css';
import 'juejin-markdown-themes/dist/juejin.min.css'; // 掘金同款样式
// 插件
const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
];
// 数据初始化
const state = reactive({
  plugins: markRaw(pluginsList),
  value: '',
  zh: zhHans,
});
const { markDownRef, plugins, value, zh } = toRefs(state);
// 模拟数据
onMounted(() => {
  state.value = '# Hi，欢迎使用闪念笔记的新老朋友\n\n\n## 我是谁';
});
</script>
<template>
  <Viewer ref="markDownRef" :locale="zh" :plugins="plugins" :value="value" />
</template>
