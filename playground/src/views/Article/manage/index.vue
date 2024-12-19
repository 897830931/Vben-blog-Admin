<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getArticleList } from '#/api';

const router = useRouter();
interface RowType {
  category_id: string; // 分类
  comment_count: null | number; // 评论数量
  content: string; // 内容
  cover: string; // 封面图
  created_at: string; // 发布时间
  id: number | string;
  is_featured: boolean | null; // 是否推荐
  like_count: null | number; // 点赞数
  status: 'actived' | 'draft' | 'published'; // 状态
  summary: string; // 摘要
  tag: string[]; // 标签
  title: string; // 标题
  update_at: string; // 更新时间
  view_count: null | number; // 浏览数量
}
// 获取文章
const getData = async (page: any, searchInfo: any) => {
  const params = {
    currentPage: page.currentPage,
    pageSize: page.pageSize,
    ...searchInfo,
  };
  const res = await getArticleList(params);
  return {
    total: res.totalCount,
    items: res.list,
    list: res.list,
  };
};
// 搜索表单配置
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  formItemsClass: 'pb-4',
  schema: [
    {
      component: 'Input',
      fieldName: 'title',
      label: '标题',
    },
    {
      component: 'DatePicker',
      fieldName: 'created_at',
      label: '发布时间',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '随笔',
            value: '1',
          },
          {
            label: '技术日常',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'category_id',
      label: '类型',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '已发布',
            value: 'published',
          },
          {
            label: '草稿',
            value: 'draft',
          },
          {
            label: '已归档',
            value: 'actived',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 0,
          },
        ],
      },
      fieldName: 'is_featured',
      label: '是否推荐',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: true,
  wrapperClass: 'grid-cols-4',
};
// table配置
const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    {
      align: 'left',
      field: 'title',
      minWidth: 100,
      title: '标题',
    },
    { cellRender: { name: 'CellImage' }, field: 'cover', title: '封面' },
    { field: 'summary', showOverflow: true, title: '摘要' },
    { field: 'category_id', title: '分类' },
    { field: 'status', title: '状态' },
    { field: 'is_featured', title: '是否推荐' },
    {
      field: 'view_count',
      sortable: true,
      sortType: 'number',
      title: '浏览量',
    },
    { field: 'created_at', title: '发布时间' },
    { slots: { default: 'action' }, title: '操作' },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    pageSizes: [10, 20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getData(page, formValues);
      },
    },
  },
  rowClassName: 'h-24',
};
// 表单配置
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
// 新增
const handleCreate = () => {
  router.push({
    path: '/article/edit',
  });
};
function editRowEvent(row: RowType) {
  router.push({
    path: '/article/edit',
    query: {
      id: row.id,
    },
  });
}
const deleteRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <Button class="ml-2" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="editRowEvent(row)">编辑</Button>
        <Button type="link" @click="deleteRowEvent(row)">删除</Button>
      </template>
    </Grid>
  </Page>
</template>
