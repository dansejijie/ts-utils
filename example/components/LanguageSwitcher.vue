<template>
  <div class="language-switcher">
    <button @click="toggleLanguage">
      {{ currentLocale === 'zh-CN' ? 'English' : '中文' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getLocale, setLocale } from '../locales'

const currentLocale = computed(() => getLocale())

const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  setLocale(newLocale)
}
</script>

<style scoped>
.language-switcher {
  margin: 10px;
}
</style> 