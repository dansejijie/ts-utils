/**
 * 动态导入指定路径的模块
 * @param relativePath - 相对路径，（基于reference.ts文件的相对路径） 例如: `../../example/form/controllers/Input`
 */
export async function importModule(relativePath: string) {
  try {
    const module = await import(/* @vite-ignore */ relativePath)
    return module.default || module
  } catch (error) {
    console.error(`Failed to import module: ${relativePath}`, error)
    throw error
  }
} 