import { JSONSchemaType } from "ajv";

interface PasswordSchema {
  password: string
}

export const passwordSchema: JSONSchemaType<PasswordSchema> = {
  type: "object",
  properties: {
    password: {
      type: "string",
      nullable: false
    }
  },
  required: ["password"],
  additionalProperties: false
};