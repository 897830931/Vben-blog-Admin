<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import MarkdownEdit from '#/components/MarkdownEdit/index.vue';

const route = useRoute();
const articleId = ref(route.query.id);
const title = ref(articleId.value ? '编辑文章' : '新增文章');

const [ArticleForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit: onSubmit,
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入文章标题',
      },
      fieldName: 'title',
      label: '标题',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: '技术', value: 'tech' },
          { label: '生活', value: 'life' },
        ],
        placeholder: '请选择分类',
      },
      fieldName: 'category_id',
      label: '分类',
    },
    {
      component: 'Input',
      fieldName: 'content',
      formItemClass: 'col-span-2 items-baseline',
      label: '详情',
    },

    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入文章摘要',
        rows: 4,
      },
      fieldName: 'summary',
      label: '摘要',
    },
    {
      component: 'Upload',
      componentProps: {
        fileList: [],
      },
      fieldName: 'cover',
      label: '封面图',
    },
    {
      component: 'Input',
      fieldName: 'tags',
      label: '标签',
    },
    {
      component: 'Switch',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      fieldName: 'is_featured',
      label: '推荐文章',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '草稿', value: 'draft' },
          { label: '已发布', value: 'published' },
          { label: '已归档', value: 'archived' },
        ],
        placeholder: '请选择状态',
      },
      fieldName: 'status',
      label: '状态',
    },
  ],
  wrapperClass: 'grid-cols-2',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page :title="title" auto-content-height>
    <ArticleForm>
      <template #content>
        <MarkdownEdit
          class="w-full"
          @change="
            (value) => {
              formApi.setFieldValue('content', value);
            }
          "
        />
      </template>
    </ArticleForm>
  </Page>
</template>
