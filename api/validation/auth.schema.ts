import { JSONSchemaType } from "ajv";
import { regUsername } from "../utils/regex";

interface AuthRegistSchema {
  name: string,
  username: string,
  email: string,
  password: string
}

type AuthLoginEmailSchema = Omit<AuthRegistSchema, "name" | "username">;

type AuthLoginUsernameSchema = Omit<AuthRegistSchema, "name" | "email">;

export const authRegistSchema: JSONSchemaType<AuthRegistSchema> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      nullable: false,
      maxLength: 60
    },
    username: {
      type: "string",
      nullable: false,
      minLength: 3,
      maxLength: 30,
      pattern: regUsername.source,
      errorMessage: {
        pattern: "3-30 non-capital characters can only be alphanumerics, underscores, and periods"
      }
    },
    email: {
      type: "string",
      nullable: false,
      format: "email"
    },
    password: {
      type: "string",
      nullable: false,
      minLength: 8
    }
  },
  required: ["name", "username", "email", "password"],
  additionalProperties: false
};

export const authLoginEmailSchema: JSONSchemaType<AuthLoginEmailSchema> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      nullable: false,
      format: "email"
    },
    password: {
      type: "string",
      nullable: false
    }
  },
  required: ["email", "password"],
  additionalProperties: false
};

export const authLoginUsernameSchema: JSONSchemaType<AuthLoginUsernameSchema> = {
  type: "object",
  properties: {
    username: {
      type: "string",
      nullable: false
    },
    password: {
      type: "string",
      nullable: false
    }
  },
  required: ["username", "password"],
  additionalProperties: false
};