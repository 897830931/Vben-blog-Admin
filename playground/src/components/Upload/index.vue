<script lang="ts" setup>
import type { UploadProps } from 'ant-design-vue';

import { ref, useAttrs } from 'vue';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Upload as aUpload, message } from 'ant-design-vue';

import { upload } from '#/api/common';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const attrs = useAttrs();
const handleUpload = async (info: any) => {
  // 从 UploadChangeParam 中获取实际的文件对象
  const file = info.file; // 获取实际文件对象
  if (!file) {
    console.error('未选择文件');
    return;
  }
  try {
    // 使用 requestClient 发送请求，设置 POST 方法，传递 FormData 作为请求体
    const response = await upload({
      file,
    });
    attrs.value = [];
    getBase64(file, (base64Url) => {
      imageUrl.value = base64Url;
    });
    return response;
  } catch (error) {
    console.error('上传失败:', error);
    throw error;
  }
};

const beforeUpload = async (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
</script>
<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      :before-upload="beforeUpload"
      :custom-request="handleUpload"
      :show-upload-list="false"
      class="avatar-uploader"
      list-type="picture-card"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <LoadingOutlined v-if="loading" />
        <PlusOutlined v-else />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
