<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue';

import { PlusOutlined } from '@ant-design/icons-vue';
import { Tag as aTag, Input, Tooltip } from 'ant-design-vue';

const emits = defineEmits(['update:value']);
const inputRef = ref();
interface State {
  inputValue: string;
  inputVisible: boolean;
  tags: string[]; // tags 是字符串数组
}
const state = reactive<State>({
  inputValue: '',
  inputVisible: false,
  tags: [],
});
const handleClose = (removedTag: string) => {
  const tags = state.tags.filter((tag) => tag !== removedTag);
  state.tags = tags;
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};
watch(
  () => state.tags,
  () => {
    emits('update:value', state.tags);
  },
);

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = state.tags;
  if (inputValue && !tags.includes(inputValue)) {
    tags = [...tags, inputValue];
  }

  Object.assign(state, {
    inputValue: '',
    inputVisible: false,
    tags,
  });
};
const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

// 随机选择颜色
const getTagColor = (index: number) => {
  // 如果 index 超过颜色数组的长度，可以循环回去
  return colors[index % colors.length];
};
</script>
<template>
  <!-- 作为formSlot的时候， -->
  <div>
    <template v-for="(tag, index) in state.tags" :key="tag">
      <Tooltip v-if="tag.length > 20" :title="tag">
        <a-tag
          :closable="true"
          :color="getTagColor(index)"
          @close="handleClose(tag)"
        >
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </Tooltip>
      <a-tag
        v-else
        :closable="true"
        :color="getTagColor(index)"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </a-tag>
    </template>

    <Input
      v-if="state.inputVisible"
      ref="inputRef"
      v-model:value="state.inputValue"
      :style="{ width: '78px' }"
      size="middle"
      type="text"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag
      v-else
      style="background: #fff; border-style: dashed"
      @click="showInput"
    >
      <PlusOutlined />
      新增
    </a-tag>
  </div>
</template>
<style lang="scss" scoped>
:deep(.ant-tag) {
  padding: 6px 15px;
  font-size: 16px;
}
</style>
