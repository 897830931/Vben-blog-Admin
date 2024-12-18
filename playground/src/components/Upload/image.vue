<script lang="ts" setup>
import type { UploadProps } from 'ant-design-vue';

import { ref } from 'vue';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Modal as aModal, Upload as aUpload, message } from 'ant-design-vue';

import { upload } from '#/api/common';

const emit = defineEmits(['update:fileList']);
const fileList = ref([]);
const loading = ref<boolean>(false);
const handleUpload = async (info: any) => {
  // 从 UploadChangeParam 中获取实际的文件对象
  const file = info.file; // 获取实际文件对象
  if (!file) {
    return;
  }
  // 使用 requestClient 发送请求，设置 POST 方法，传递 FormData 作为请求体
  const response = await upload({
    file,
  });
  // 上传成功后，更新状态为 'done'
  info.onSuccess(response, file); // 必须调用 onSuccess
  file.status = 'done'; // 确保状态变为 done
  emit('update:fileList', fileList.value);
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
// 图片展示
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file: UploadProps['fileList'][number]) => {
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.slice(Math.max(0, file.url.lastIndexOf('/') + 1));
};
</script>
<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      :before-upload="beforeUpload"
      :custom-request="handleUpload"
      :show-upload-list="true"
      class="avatar-uploader"
      list-type="picture-card"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 6">
        <PlusOutlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
      <div v-else>
        <LoadingOutlined v-if="loading" />
        <PlusOutlined v-else />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal
      :footer="null"
      :open="previewVisible"
      :title="previewTitle"
      @cancel="handleCancel"
    >
      <img :src="previewImage" alt="example" style="width: 100%" />
    </a-modal>
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
