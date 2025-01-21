import { defineConfig } from 'tsup'
import { sync } from 'glob';

// 获取所有 src 文件夹下的 index.ts 文件
const entries = sync('src/*/index.ts');

export default defineConfig({
  entry: entries,
  format: ['esm', 'cjs'],  // 输出格式：ESM 和 CommonJS
  dts: true,  // 生成声明文件
  sourcemap: true,  // 生成源码映射文件
  clean: true,  // 清理输出目录
})