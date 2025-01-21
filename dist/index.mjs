// src/file/index.ts
var urlToFile = async (url, filename, mimeType) => {
  return fetch(url).then((response) => response.blob()).then((blob) => new File([blob], filename, { type: mimeType }));
};

// src/url/index.ts
var add = () => {
};
export {
  add,
  urlToFile
};
//# sourceMappingURL=index.mjs.map