/**
 * 表单项基础配置
 */
export interface IFieldConfig<T = any> {
  /** 类型 */
  component: string; // 指定对应的同名组件
  /** 初始值 */
  value?: T;
  /** 标签文本 */
  label?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 校验规则 */
  rules?: Array<(value: T) => Promise<string | undefined>>;
} 