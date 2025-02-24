import IField from "../../../src/form/IField";
import { IFieldConfig } from "../../../src/form/types";

export interface IInputConfig extends IFieldConfig<string> {
    attrs: {
        placeholder?: string;
    }
}

export default class Input implements IField<string> { 


    value: string;
    config: IInputConfig;

    listener =  (key: string, value: string) => {};
    constructor(config: IInputConfig) {
        this.value = config.value;
        this.config = config;
    }
    validate(): Promise<boolean> {
        return Promise.resolve(true);
    }
    getValue(): Promise<string> {
        return Promise.resolve(this.config.value);
    }
    setValue(value: string): Promise<void> {
        this.value = value;
        this.listener(this.config.key, value);
        return Promise.resolve();
    }
    getConfig(): IFieldConfig<string> {
        return this.config;
    }
    addListener(listener: (key: string, value: string) => void): void {
        this.listener = listener;
    }
}