<template>
  <div class="form-demo">
    <h2>表单示例</h2>
    <LanguageSwitcher />
    <BasicForm
      :controller="form"
    >
      <template #footer>
        <div class="form-buttons">
          <button @click="handleSubmit">{{ $t('common.submit') }}</button>
          <button @click="handleReset">{{ $t('common.reset') }}</button>
        </div>
      </template>
    </BasicForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicFormClass from './form/BasicForm'
import { IFieldConfig } from '../src/form/types'
import { onMounted } from 'vue'
import BasicForm from '@example/form/BasicForm.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
// 定义表单配置
const formConfig: Record<string, IFieldConfig<any>> = {
  username: {
    view: 'Input',
    controller: 'Input',
    key: 'username',
    name: '用户名',
    value: '',
    attrs: {}
  },
  password: {
    view: 'Input',
    controller: 'Input',
    key: 'password',
    name: '密码',
    value: '',
    attrs: {}
  }
} as const

// 创建表单实例
const formInstance = new BasicFormClass()
const form = ref(formInstance)

const  initForm = async() => {
  formInstance.setImportDirectory('../../example/form/controllers/')
  await formInstance.addField(formConfig['username'])
}

onMounted(async () => {
  await initForm()
});



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

const username = ref('Claude')
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