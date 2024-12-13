import { requestClient } from '#/api/request';

export namespace ArticleApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export const list = '/article/pageList';
  export const detail = '/article/detail';
}

/**
 * 获取示例表格数据
 */
async function getArticleList(params: ArticleApi.PageFetchParams) {
  return requestClient.get(ArticleApi.list, { params });
}
async function getArticleDetail(id: number | string) {
  return requestClient.get(ArticleApi.detail, { params: { id } });
}
export { getArticleDetail, getArticleList };
