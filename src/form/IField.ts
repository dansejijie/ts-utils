/**
 * 表单项接口
 */
export default interface IField<T = any> {
  /** 校验数据 */
  validate(): Promise<boolean>;
  /** 获取数据 */
  getValue(): Promise<T>;
  /** 设置数据 */
  setValue(value: T): Promise<void>;
  /** 监听数据变动 */
  onChange(callback: (value: T) => void): void;
} 