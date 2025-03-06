import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import i18n, { initLocale } from './locales'

// 初始化语言设置
initLocale()

const app = createApp(App)
app.use(Antd)
app.use(i18n)
app.mount('#app') 