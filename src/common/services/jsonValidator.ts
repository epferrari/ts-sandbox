import * as Ajv from 'ajv';
import {JSONSchema6} from 'json-schema';

const ajv = new Ajv();

export class JsonValidator {
  public static validate(schema: JSONSchema6, data: any): boolean {
    return ajv.validate(schema, data) as boolean;
  }

  public static errors(schema: JSONSchema6, data: any): string[] {
    const errors: string[] = [];
    const valid = ajv.validate(schema, data) as boolean;
    if (valid) {
      return errors;
    } else {
      return ajv.errors.map((err: Ajv.ErrorObject) => `${err.dataPath || 'root'}: ${err.message}`);
    }
  }
}


