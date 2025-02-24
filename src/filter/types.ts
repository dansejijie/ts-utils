/**
 * 表单项 配置参数定义
 */
export interface IFieldConfig<T = any> {
    /** 类型 */
    view: string; // 视图名称 ,用于指定目录下同名视图的导出
    controller: string; // 控制器名称，用于指定目录下同名控制器的导出
    /** 表单项的唯一标识 */
    key: string;
    /** 初始值 */
    value: T;
    /** 标签文本 */
    name?: string;
    /** 是否禁用 */
    disabled?: boolean;

    /** 其他属性 用于其他字段的扩展 */
    attrs: Record<string, any>;
  } 