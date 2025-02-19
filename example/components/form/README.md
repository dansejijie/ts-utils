# 当前文件夹结构
./form/
├── fields/ # 基于 src/utils/form/types/Field 接口实现 入口文件夹
│   ├──Input.ts # 示例：输入框
├── components/ # 表单项组件入口文件夹，接受 src/utils/form/types/Field 实例
│   ├──Input.vue # 示例组件：输入框组件
├── BasicForm.vue # 基础表单 


# 设计思路
* BasicForm 组件 负责表单布局
* BasicForm 组件 接受 src/utils/form/BasicForm.ts 实例
* BasicForm 组件 根据 src/utils/form/BasicForm.ts 实例里注册的所有表单项动态生成表单项组件
* BasicForm 组件 支持表单项扩展
* BasicForm 组件 支持表单项扩展
* Input 组件 接受 src/utils/form/extensions/Input.ts 实例，内部与实例进行交互
