import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],  // 输出格式：ESM 和 CommonJS
  dts: true,  // 生成声明文件
  sourcemap: true,  // 生成源码映射文件
  clean: true,  // 清理输出目录
})