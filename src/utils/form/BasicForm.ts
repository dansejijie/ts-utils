import { IForm } from './types/Form';
import { IField } from './types/Field';

export class BasicForm implements IForm {
  private fields: Map<string, IField> = new Map();
  private changeCallbacks: Array<(values: Record<string, any>) => void> = [];

  constructor() {
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  public addField(name: string, field: IField): void {
    this.fields.set(name, field);
    field.onChange(this.handleFieldChange);
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