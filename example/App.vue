<template>
  <div class="app">
    <h1>TS-Utils 演示</h1>
    <div class="demo-section">
      <h2>工具函数演示</h2>
      <div class="demo-item">
        <h3>add 函数</h3>
        <p>1 + 2 = {{ addResult }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { add } from '../src/utils'

const addResult = add(1, 2)
</script>

<style>
.app {
  padding: 20px;
}
.demo-section {
  margin: 20px 0;
}
.demo-item {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 10px 0;
}
</style> 