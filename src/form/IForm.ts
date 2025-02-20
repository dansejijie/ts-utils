import IField from './IField';

/**
 * 表单接口
 */
export default interface IForm {
  /** 校验所有表单项 */
  validate(): Promise<boolean>;
  /** 获取表单数据 */
  getValues(): Promise<Record<string, any>>;
  /** 设置表单数据 */
  setValues(values: Record<string, any>): Promise<void>;
  /** 重置表单 */
  reset(): Promise<void>;
  /** 获取指定表单项 */
  getField(name: string): IField | undefined;
  /** 监听表单变化 */
  onChange(callback: (values: Record<string, any>) => void): void;
} 