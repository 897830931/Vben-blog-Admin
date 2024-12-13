import { requestClient } from '#/api/request';

// 定义响应数据的类型
interface ResponseData {
  fileName: string;
  fileUrl: string;
}

/**
 * 上传文件
 * @param params 上传的文件数据
 */
async function upload(params: any): Promise<ResponseData> {
  const response = await requestClient.upload('/upload', params);

  // 假设请求返回的数据包含 fileUrl 和 fileName
  return response.data as ResponseData; // 明确返回类型
}

export { upload };
