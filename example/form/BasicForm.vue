<script setup lang="ts">
import { computed } from 'vue'
import type { BasicForm } from '../../../src/utils/form/BasicForm'
import Input from './extensions/Input.vue'

// 定义组件属性
interface Props {
  form: BasicForm
  config: Record<string, any>
}

const props = defineProps<Props>()

// 动态组件映射表
const componentMap = {
  'Input': Input
}

// 计算所有表单项
const formItems = computed(() => {
  const fields = props.form.fields
  return Object.entries(fields).map(([name, field]) => {
    const config = props.config[name]
    return {
      name,
      field,
      config,
      component: componentMap[config.component as keyof typeof componentMap]
    }
  })
})
</script>

<template>
  <div class="basic-form">
    <div class="form-items">
      <div 
        v-for="item in formItems" 
        :key="item.name"
        class="form-item"
      >
        <label v-if="item.config.label" class="form-label">
          {{ item.config.label }}
        </label>
        <component
          :is="item.component"
          :field="item.field"
          v-bind="item.config"
        />
      </div>
    </div>
    
    <!-- 表单底部插槽 -->
    <slot name="footer" />
  </div>
</template>

<style scoped>
.basic-form {
  width: 100%;
}

.form-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: #333;
}
</style>
