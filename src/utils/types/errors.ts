/**
 * 文件校验错误类型
 */
export enum FileValidationErrorType {
  /** 文件不存在 */
  NOT_FOUND = 'NOT_FOUND',
  /** 文件大小超出限制 */
  SIZE_EXCEEDED = 'SIZE_EXCEEDED',
  /** 文件类型不支持 */
  INVALID_TYPE = 'INVALID_TYPE',
  /** 文件名不合法 */
  INVALID_NAME = 'INVALID_NAME'
}

/**
 * 文件校验错误接口
 */
export interface FileValidationError {
  type: FileValidationErrorType;
  message: string;
} 