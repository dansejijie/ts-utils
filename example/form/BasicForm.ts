import IForm from '../../src/form/IForm';
import IField from '../../src/form/IField';
import { IFieldConfig } from '../../src/form/types';
import { importModule } from '@/utils/references';
import { reactive } from 'vue';

export default class BasicForm implements IForm {
  public fields: Array<IField> = reactive([]);
  private changeCallbacks: Array<(values: Record<string, any>) => void> = [];
  private importDirectory: string = '';
  constructor() {
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  /**
   * 技术限制，需要主动指定导入的文件夹相对路径
   * @param directory 
   */
  public setImportDirectory(directory: string): void {
    this.importDirectory = directory;
  }

  public async addField(field: IField | IFieldConfig): Promise<void> {
    if ('controller' in field) {
      const { controller } = field as IFieldConfig;
      const relativePath = `${this.importDirectory}/${controller}.ts`
      console.log('relativePath', relativePath);
      const Clz  = await importModule(relativePath) ;
      console.log('Clz', Clz);
      const instance = new Clz(field);
      this.fields.push(instance);
      instance.addListener(this.handleFieldChange);
    } else {
      this.fields.push(field as IField);
      field.addListener(this.handleFieldChange);
    }
  }

  public async validate(): Promise<boolean> {
    const results = await Promise.all(
      this.fields.map(async (field) => {
        const isValid = await field.validate();
        return { name: field.getConfig().key, isValid };
      })
    );
    return results.every(result => result.isValid);
  }

  public async getValues(): Promise<Record<string, any>> {
    const values: Record<string, any> = {};
    await Promise.all(
     this.fields.map(async (field) => {
        values[field.getConfig().key] = await field.getValue();
      })
    );
    return values;
  }

  public async setValues(values: Record<string, any>): Promise<void> {
    await Promise.all(
      Object.entries(values).map(async ([name, value]) => {
        const field = this.fields.find(field => field.getConfig().key === name);
        if (field) {
          await field.setValue(value);
        }
      })
    );
  }

  public async reset(): Promise<void> {
    await Promise.all(
      Array.from(this.fields.values()).map(field => field.setValue(undefined))
    );
  }

  public getField(name: string): IField | undefined {
    return this.fields.find(field => field.getConfig().key === name);
  }

  public onChange(callback: (values: Record<string, any>) => void): void {
    this.changeCallbacks.push(callback);
  }

  private handleFieldChange(): void {
    this.getValues().then(values => {
      this.changeCallbacks.forEach(callback => callback(values));
    });
  }
} 