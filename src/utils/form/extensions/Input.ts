import { IField } from '../types/Field';
import { IFieldConfig } from '../types/FieldConfig';

export interface InputConfig extends IFieldConfig<string> {
  placeholder?: string;
  maxLength?: number;
}

export class InputField implements IField<string> {
  private value: string = '';
  private config: InputConfig;
  private changeCallbacks: Array<(value: string) => void> = [];

  constructor(config: InputConfig) {
    this.config = config;
    this.value = config.value || '';
  }

  public async validate(): Promise<boolean> {
    if (this.config.required && !this.value) {
      return false;
    }

    if (this.config.rules) {
      for (const rule of this.config.rules) {
        const error = await rule(this.value);
        if (error) {
          return false;
        }
      }
    }

    return true;
  }

  public async getValue(): Promise<string> {
    return this.value;
  }

  public async setValue(value: string): Promise<void> {
    this.value = value;
    this.notifyChange();
  }

  public onChange(callback: (value: string) => void): void {
    this.changeCallbacks.push(callback);
  }

  private notifyChange(): void {
    this.changeCallbacks.forEach(callback => callback(this.value));
  }
} 