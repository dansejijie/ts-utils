import IField from "../../../src/form/IField";
import { IFieldConfig } from "../../../src/form/types";

export interface IInputConfig extends IFieldConfig<string> {
    attrs: {
        placeholder?: string;
    }
}

export default class Input implements IField<string> { 

    config: IInputConfig;
    constructor(config: IInputConfig) {
        this.config = config;
    }
    validate(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getValue(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    setValue(value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onChange(callback: (value: string) => void): void {
        throw new Error("Method not implemented.");
    }
}