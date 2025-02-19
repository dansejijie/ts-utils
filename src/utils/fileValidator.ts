import { FileValidationError, FileValidationErrorType } from './types/errors';

/**
 * 文件校验配置接口
 */
export interface FileValidationConfig {
  /** 最大文件大小(字节) */
  maxSize?: number;
  /** 允许的文件类型 */
  allowedTypes?: string[];
  /** 允许的文件名正则 */
  namePattern?: RegExp;
}

/**
 * 文件校验结果接口
 */
export interface FileValidationResult {
  isValid: boolean;
  errors: FileValidationError[];
}

/**
 * 校验文件
 * @param file - 要校验的文件
 * @param config - 校验配置
 * @returns 校验结果
 */
export const validateFile = (
  file: File,
  config: FileValidationConfig = {}
): FileValidationResult => {
  const errors: FileValidationError[] = [];
  const {
    maxSize = 10 * 1024 * 1024, // 默认10MB
    allowedTypes = [],
    namePattern = /^[a-zA-Z0-9-_\.]+$/
  } = config;

  // 检查文件大小
  if (file.size > maxSize) {
    errors.push({
      type: FileValidationErrorType.SIZE_EXCEEDED,
      message: `文件大小超出限制：${(maxSize / 1024 / 1024).toFixed(2)}MB`
    });
  }

  // 检查文件类型
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push({
      type: FileValidationErrorType.INVALID_TYPE,
      message: `不支持的文件类型：${file.type}，允许的类型：${allowedTypes.join(', ')}`
    });
  }

  // 检查文件名
  if (!namePattern.test(file.name)) {
    errors.push({
      type: FileValidationErrorType.INVALID_NAME,
      message: '文件名包含非法字符'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 