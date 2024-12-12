<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getArticleList } from '#/api';

const router = useRouter();
interface RowType {
  category: string;
  content: string;
  cover: string;
  id: number | string;
  time: string;
  title: string;
  viewCount: number;
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
    total: 100,
    items: res.list,
    list: res.list,
  };
};
// 搜索表单配置
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      defaultValue: '1',
      fieldName: 'title',
      label: '标题',
    },
    {
      component: 'DatePicker',
      fieldName: 'date',
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
      fieldName: 'type',
      label: '类型',
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
      minWidth: 200,
      showOverflow: true,
      title: '标题',
    },
    { field: 'category', title: '分类' },
    { cellRender: { name: 'CellImage' }, field: 'cover', title: '封面' },
    { field: 'content', title: '详情' },
    { field: 'viewCount', sortable: true, sortType: 'number', title: '浏览量' },
    { field: 'time', title: '发布时间' },
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

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  router.push({
    path: '/article/edit',
    query: {
      id: row.id,
    },
  });
}

async function saveRowEvent(row: RowType) {
  await gridApi.grid?.clearEdit();

  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
    message.success({
      content: `保存成功！category=${row.category}`,
    });
  }, 600);
}
const cancelRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <Button type="link" @click="saveRowEvent(row)">保存</Button>
          <Button type="link" @click="cancelRowEvent(row)">取消</Button>
        </template>
        <template v-else>
          <Button type="link" @click="editRowEvent(row)">编辑</Button>
        </template>
      </template>
    </Grid>
  </Page>
</template>
