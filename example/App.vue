<template>
  <div class="form-demo">
    <h2>表单示例</h2>
    <BasicForm
      :form="form"
      :config="formConfig"
    >
      <template #footer>
        <div class="form-buttons">
          <button @click="handleSubmit">提交</button>
          <button @click="handleReset">重置</button>
        </div>
      </template>
    </BasicForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicForm as BasicFormClass } from '../src/utils/form/BasicForm'
import BasicForm from './components/form/BasicForm.vue'

// 定义表单配置
const formConfig = {
  username: {
    component: 'Input',
    label: '用户名',
    placeholder: '请输入用户名',
    rules: [
      { required: true, message: '请输入用户名' }
    ]
  },
  password: {
    component: 'Input',
    label: '密码',
    inputType: 'password',
    placeholder: '请输入密码',
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码长度不能小于6位' }
    ]
  }
} as const

// 创建表单实例
const formInstance = new BasicFormClass()
const form = ref(formInstance)


// 提交方法
const handleSubmit = async () => {
  try {
    const valid = await form.value.validate()
    if (valid) {
      const formData = form.value.getValues()
      console.log('表单数据:', formData)
    }
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置方法
const handleReset = () => {
  form.value.reset()
}
</script>

<style scoped>
.form-demo {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
}

button:hover {
  background-color: #f5f5f5;
}
</style> 