import { IFieldConfig } from "./types";

/**
 * 表单项接口
 */
export default interface IField<T = any> {
  /** 获取数据 */
  getValue(): Promise<T>;
  /** 设置数据 */
  setValue(value: T): Promise<void>;
  /** 获取配置 */
  getConfig(): IFieldConfig<T>;
  /** 监听数据变动 */
  addListener(listener: (key: string, value: T) => void): void;
} 