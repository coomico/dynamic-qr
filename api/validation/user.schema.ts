import { JSONSchemaType } from "ajv";
import { regUsername } from "../utils/regex";

interface UserUpdateSchema {
  name?: string,
  username?: string,
  email?: string
}

interface UserChangePasswordSchema {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export const userUpdateSchema: JSONSchemaType<UserUpdateSchema> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      nullable: true,
      maxLength: 60
    },
    username: {
      type: "string",
      nullable: true,
      minLength: 3,
      maxLength: 30,
      pattern: regUsername.source,
      errorMessage: {
        pattern: "3-30 non-capital characters can only be alphanumerics, underscores, and periods"
      }
    },
    email: {
      type: "string",
      nullable: true,
      format: "email"
    }
  },
  additionalProperties: false
};

export const userChangePasswordSchema: JSONSchemaType<UserChangePasswordSchema> = {
  type: "object",
  properties: {
    currentPassword: {
      type: "string",
      nullable: false,
      minLength: 8
    },
    newPassword: {
      type: "string",
      nullable: false,
      minLength: 8
    },
    confirmNewPassword: {
      type: "string",
      nullable: false,
      minLength: 8
    }
  },
  required: ["currentPassword", "newPassword", "confirmNewPassword"],
  additionalProperties: false
};