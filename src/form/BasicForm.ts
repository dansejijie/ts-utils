import IForm from './IForm';
import IField from './IField';
import { IFieldConfig } from './types';

export default class BasicForm implements IForm {
  private fields: Map<string, IField> = new Map();
  private changeCallbacks: Array<(values: Record<string, any>) => void> = [];
  private importDirectory: string = '';
  constructor() {
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  public setImportDirectory(directory: string): void {
    this.importDirectory = directory;
  }

  public async addField(name: string, field: IField | IFieldConfig): Promise<void> {
    if ('controller' in field) {
      const { controller } = field as IFieldConfig;
      const relativePath = `${this.importDirectory}/${controller}.ts`
      console.log('relativePath', relativePath);
      const Clz  = await import(relativePath) ;
      console.log('Clz', Clz);
      const instance = new Clz.default(field);
      this.fields.set(name, instance);
      instance.onChange(this.handleFieldChange);
    } else {
      this.fields.set(name, field as IField);
      field.onChange(this.handleFieldChange);
    }
  }

  public async validate(): Promise<boolean> {
    const results = await Promise.all(
      Array.from(this.fields.entries()).map(async ([name, field]) => {
        const isValid = await field.validate();
        return { name, isValid };
      })
    );
    return results.every(result => result.isValid);
  }

  public async getValues(): Promise<Record<string, any>> {
    const values: Record<string, any> = {};
    await Promise.all(
      Array.from(this.fields.entries()).map(async ([name, field]) => {
        values[name] = await field.getValue();
      })
    );
    return values;
  }

  public async setValues(values: Record<string, any>): Promise<void> {
    await Promise.all(
      Object.entries(values).map(async ([name, value]) => {
        const field = this.fields.get(name);
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
    return this.fields.get(name);
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