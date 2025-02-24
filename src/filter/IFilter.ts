import IField from './IField';

/**
 * 筛选项接口
 */
export default interface IFilter {
  /** 获取筛选数据 */
  getValues(): Promise<Record<string, any>>;
  /** 设置筛选数据 */
  setValues(values: Record<string, any>): Promise<void>;
  /** 监听表单变化 */
  onChange(callback: (values: Record<string, any>) => void): void;
} 