import { createI18n } from 'vue-i18n'
import type { I18n, Locale } from 'vue-i18n'

// 导入语言包
import zhCN from './zh-CN.ts'
import enUS from './en-US.ts'

// 语言包
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用组合式 API
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en-US', // 回退语言
  messages
})

/**
 * 切换语言
 * @param locale 目标语言
 */
export const setLocale = (locale: Locale): void => {
  i18n.global.locale.value = locale
  // 保存到本地存储
  localStorage.setItem('app-locale', locale)
  // 设置 HTML lang 属性
  document.querySelector('html')?.setAttribute('lang', locale)
}

/**
 * 获取当前语言
 */
export const getLocale = (): Locale => {
  return i18n.global.locale.value
}

/**
 * 从本地存储获取语言设置
 */
export const getStoredLocale = (): Locale | null => {
  return localStorage.getItem('app-locale') as Locale | null
}

/**
 * 初始化语言设置
 */
export const initLocale = (): void => {
  // 优先使用存储的语言设置
  const storedLocale = getStoredLocale()
  if (storedLocale && Object.keys(messages).includes(storedLocale)) {
    setLocale(storedLocale)
    return
  }
  
  // 否则使用浏览器语言
  const browserLang = navigator.language
  const locale = Object.keys(messages).find(
    lang => browserLang === lang || browserLang.startsWith(lang.split('-')[0])
  ) || 'zh-CN'
  
  setLocale(locale)
}

export default i18n
