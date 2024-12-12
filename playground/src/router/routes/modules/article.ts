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
        path: '/articleManage',
        component: () => import('#/views/Article/manage/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '文章列表',
        },
      },
    ],
  },
];

export default routes;
