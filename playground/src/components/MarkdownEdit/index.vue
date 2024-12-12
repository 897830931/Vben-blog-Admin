<script setup>
import { markRaw, reactive, toRefs } from 'vue';

import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { Editor } from '@bytemd/vue-next';
import zhHans from 'bytemd/locales/zh_Hans.json';

import 'bytemd/dist/index.css';
import 'juejin-markdown-themes/dist/juejin.min.css';

// 定义事件，通知父组件更新
const emit = defineEmits(['change']);

const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
];

// 响应式状态（用于扩展功能）
const state = reactive({
  plugins: markRaw(pluginsList),
  value: '',
  zh: zhHans,
});

// 解构需要的状态
const { plugins, value, zh } = toRefs(state);

// 输入变更事件
const handleInput = (val) => {
  value.value = val;
  emit('change', val); // 通知父组件输入变更
};
</script>

<template>
  <Editor
    :locale="zh"
    :plugins="plugins"
    :value="value"
    @change="handleInput"
  />
</template>

<style lang="scss" scoped>
:deep(.bytemd) {
  height: 600px;
}
</style>
