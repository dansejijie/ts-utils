/**
 * url 转为 文件格式
 * @param url
 * @param filename
 * @param mimeType
 * @returns
 */
declare const urlToFile: (url: string, filename: string, mimeType: string) => Promise<File>;

export { urlToFile };
