import type { WorkbenchProjectItem } from '@vben/common-ui';

import { requestClient } from '#/api/request';

export namespace ProjectApi {
  export interface PageFetchParams {
    [key: string]: any;
    page?: number;
    pageSize?: number;
  }
  export const list = '/project/pageList';
}

/**
 * 获取项目列表
 * @param params 分页参数
 * @returns 返回的项目列表数据
 */
async function getProjectList(params?: ProjectApi.PageFetchParams) {
  const response = await requestClient.get<{
    list: WorkbenchProjectItem[];
  }>(ProjectApi.list, { params });
  return response; // 返回 list 数组，类型是 WorkbenchProjectItem[]
}

export { getProjectList };
