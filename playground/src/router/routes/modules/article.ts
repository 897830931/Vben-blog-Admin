import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 1000,
      title: '文章管理',
    },
    name: 'article',
    path: '/article',
    children: [
      {
        name: 'articleManage',
        path: '/article/manage',
        component: () => import('#/views/Article/manage/index.vue'),
        meta: {
          affixTab: false,
          icon: 'lucide:area-chart',
          title: '文章列表',
        },
      },
      {
        name: 'articleEdit',
        path: '/article/edit',
        component: () => import('#/views/Article/Edit/index.vue'),
        meta: {
          affixTab: false,
          hideInMenu: true,
          hideInTab: true,
          title: '文章编辑',
        },
      },
    ],
  },
];

export default routes;
