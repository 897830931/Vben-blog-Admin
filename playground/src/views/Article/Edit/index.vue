<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { useVbenForm, z } from '#/adapter/form';
import { getArticleDetail } from '#/api/article';
import MarkdownEdit from '#/components/MarkdownEdit/index.vue';
import TagInput from '#/components/TagInput/index.vue';
import Upload from '#/components/Upload/image.vue';

const route = useRoute();
// 定义 articleId，并标注为可能为字符串或 undefined
const articleId = ref<string | undefined>(route.query.id as string | undefined);
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
      rules: 'required',
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
      rules: 'required',
    },
    {
      component: 'Switch',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      fieldName: 'is_featured',
      label: '推荐文章',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'content',
      formItemClass: 'col-span-4 items-baseline',
      label: '详情',
      rules: 'required',
    },

    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入文章摘要',
        rows: 4,
      },
      fieldName: 'summary',
      formItemClass: 'col-span-2 items-baseline',
      label: '摘要',
      rules: 'required',
    },
    {
      component: 'Upload',
      componentProps: {
        fileList: [],
      },
      fieldName: 'cover',
      formItemClass: 'col-span-2 items-baseline',
      label: '封面图',
      rules: z.array(z.string()).min(1, '至少上传一张封面'),
    },
    {
      component: 'Input',
      fieldName: 'tags',
      formItemClass: 'col-span-2 items-baseline',
      label: '标签',
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
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-4',
});
// 提交函数
function onSubmit(values: any) {
  const params = {
    ...values,
    cover: values.cover?.map((item: any) => item.response) ?? [],
  };
  // eslint-disable-next-line no-console
  console.log(params);
  return params;
}
onMounted(async () => {
  if (articleId.value) {
    const res = await getArticleDetail(articleId.value);
    formApi.setValues(res);
  }
});
</script>

<template>
  <Page :title="title" auto-content-height>
    <ArticleForm>
      <template #content="contentField">
        <MarkdownEdit class="w-full" v-bind="contentField" />
      </template>
      <template #cover="coverField">
        <Upload class="w-full" v-bind="coverField" />
      </template>
      <template #tags="tags">
        <TagInput v-bind="tags" />
      </template>
    </ArticleForm>
  </Page>
</template>
