import { requestClient } from '#/api/request';

export namespace ArticleApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getArticleList(params: ArticleApi.PageFetchParams) {
  return requestClient.get('/article/pageList', { params });
}

export { getArticleList };
