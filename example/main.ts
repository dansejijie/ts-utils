import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import i18n, { initLocale } from './locales'

// 初始化语言设置
initLocale()

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  // {
  //   path: '/form',
  //   name: 'Form',
  //   component: () => import('./views/FormDemo.vue')
  // },
  // {
  //   path: '/filter',
  //   name: 'Filter',
  //   component: () => import('./views/FilterDemo.vue')
  // },
  // {
  //   path: '/i18n',
  //   name: 'I18n',
  //   component: () => import('./views/I18nDemo.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(Antd)
app.use(i18n)
app.use(router)
app.mount('#app') 