/**
 * 将 Data URL 转换为 File 对象
 * 
 * @param dataUrl - 数据 URL (base64 编码的字符串)
 * @param filename - 文件名
 * @param options - 可选配置项，如 type (MIME 类型)
 * @returns File 对象
 * 
 * @example
 * ```ts
 * // 将 base64 图片转换为文件
 * const file = dataUrlToFile('data:image/jpeg;base64,/9j/4AAQSkZJRg...', 'image.jpg');
 * ```
 */
export const dataUrlToFile = (
  dataUrl: string, 
  filename: string,
  options?: { type?: string }
): File => {
  // 从 dataUrl 中提取 MIME 类型和 base64 数据
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  
  // 创建 Uint8Array
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  // 将 base64 转换为二进制数据
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  // 创建 File 对象
  return new File(
    [u8arr], 
    filename, 
    { type: options?.type || mime }
  );
};

/**
 * 从 URL 获取文件并转换为 File 对象
 * 
 * @param url - 文件的 URL
 * @param filename - 文件名
 * @param options - 可选配置项，如 type (MIME 类型)
 * @returns Promise 解析为 File 对象
 * 
 * @example
 * ```ts
 * // 从 URL 获取图片并转换为文件
 * const file = await urlToFile('https://example.com/image.jpg', 'image.jpg');
 * ```
 */
export const urlToFile = async (
  url: string, 
  filename: string,
  options?: { type?: string }
): Promise<File> => {
  try {
    // 获取文件内容
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    
    // 获取 blob 数据
    const blob = await response.blob();
    
    // 从 blob 创建文件
    return new File(
      [blob], 
      filename, 
      { 
        type: options?.type || blob.type,
        lastModified: new Date().getTime()
      }
    );
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw error;
  }
};
