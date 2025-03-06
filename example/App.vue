<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Vue3 工具库演示</h1>
      <LanguageSwitcher />
    </header>
    
    <nav class="app-nav">
      <router-link to="/">{{ $t('nav.home') }}</router-link>
      <!-- 暂时注释未实现的路由链接 -->
      <!-- <router-link to="/form">{{ $t('nav.form') }}</router-link> -->
      <!-- <router-link to="/filter">{{ $t('nav.filter') }}</router-link> -->
      <!-- <router-link to="/i18n">{{ $t('nav.i18n') }}</router-link> -->
    </nav>
    
    <main class="app-content">
      <router-view></router-view>
    </main>
    
    <footer class="app-footer">
      <p>© 2023 Vue3 工具库演示</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  console.log('App mounted')
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.app-nav {
  display: flex;
  padding: 0.5rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
}

.app-nav a {
  margin-right: 1.5rem;
  color: #495057;
  text-decoration: none;
  font-weight: 500;
}

.app-nav a:hover {
  color: #228be6;
}

.app-nav a.router-link-active {
  color: #228be6;
  border-bottom: 2px solid #228be6;
}

.app-content {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
  color: #6c757d;
}
</style> 