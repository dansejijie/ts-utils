/**
 * url 转为 文件格式
 * @param url
 * @param filename
 * @param mimeType
 * @returns
 */
const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    return fetch(url)
        .then((response) => response.blob())
        .then((blob) => new File([blob], filename, { type: mimeType }));
};

export { urlToFile };
