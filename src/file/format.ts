/**
 * 将字节数转换为人类可读的文件大小格式
 * 
 * @param bytes - 要转换的字节数
 * @param decimals - 保留的小数位数，默认为2
 * @returns 格式化后的文件大小字符串，如 "1.5 MB"
 * 
 * @example
 * ```ts
 * formatBytes(1024); // 返回 "1 KB"
 * formatBytes(1234567); // 返回 "1.18 MB"
 * formatBytes(1234567, 0); // 返回 "1 MB"
 * ```
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024; // 定义单位基数
    const dm = decimals < 0 ? 0 : decimals; // 保证保留小数位数
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // 单位

    // 计算单位索引
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // 格式化输出
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};