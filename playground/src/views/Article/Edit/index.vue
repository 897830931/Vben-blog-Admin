<script lang="ts" setup>
// import type { VbenFormProps } from '#/adapter/form';

import { Page } from '@vben/common-ui';

import { Editor } from '@bytemd/vue-next';

// 基础的汉化
import zhHans from '@bytemd/vue-next/lib/locales/zh_Hans.json';

// 样式
import 'bytemd/dist/index.css';

const plugins = [
  // 插件
];
const editValue = ref('');
function handleChange(v) {
  editValue.value = v;
}
// const router = useRouter();

// 文章编辑表单
// const formOptions: VbenFormProps = {
//   // 默认展开
//   collapsed: false,
//   schema: [
//     {
//       component: 'Input',
//       defaultValue: '1',
//       fieldName: 'title',
//       label: '标题',
//     },
//     {
//       component: 'DatePicker',
//       fieldName: 'date',
//       label: '发布时间',
//     },
//     {
//       component: 'Select',
//       componentProps: {
//         allowClear: true,
//         options: [
//           {
//             label: '随笔',
//             value: '1',
//           },
//           {
//             label: '技术日常',
//             value: '2',
//           },
//         ],
//         placeholder: '请选择',
//       },
//       fieldName: 'type',
//       label: '类型',
//     },
//   ],
//   // 控制表单是否显示折叠按钮
//   showCollapseButton: true,
//   // 是否在字段值改变时提交表单
//   submitOnChange: true,
//   // 按下回车时是否提交表单
//   submitOnEnter: true,
//   wrapperClass: 'grid-cols-4',
// };
</script>

<template>
  <Page auto-content-height>
    <Editor
      :locale="zhHans"
      :plugins="plugins"
      :value="editValue"
      @change="handleChange"
    />
  </Page>
</template>
