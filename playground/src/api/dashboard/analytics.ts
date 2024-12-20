import { requestClient } from '#/api/request';

export namespace AnalyticsApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export const list = '/Analytics/pageList';
  export const detail = '/Analytics/detail';
}

/**
 * 获取示例表格数据
 */
async function getAnalyticsList(params: AnalyticsApi.PageFetchParams) {
  return requestClient.get(AnalyticsApi.list, { params });
}
async function getAnalyticsDetail(id: number | string) {
  return requestClient.get(AnalyticsApi.detail, { params: { id } });
}
export { getAnalyticsDetail, getAnalyticsList };
