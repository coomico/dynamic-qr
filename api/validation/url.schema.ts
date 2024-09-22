import { JSONSchemaType } from "ajv";

export interface UrlSchema {
  title?: string,
  originUrl?: string,
  isPrivate?: boolean,
  password?: string,
  description?: string,
  plusQr?: boolean
}

type UrlCreateSchema = UrlSchema & {
  title: string,
  originUrl: string,
}

export const urlCreateSchema: JSONSchemaType<UrlCreateSchema> = {
  type: "object",
  processOriginalUrl: true,
  properties: {
    title: {
      type: "string",
      nullable: false,
      maxLength: 100
    },
    originUrl: {
      type: "string",
      nullable: false,
      format: "uri"
    },
    isPrivate: {
      type: "boolean",
      nullable: true
    },
    password: {
      type: "string",
      nullable: true,
      minLength: 8
    },
    description: {
      type: "string",
      nullable: true,
      maxLength: 300
    },
    plusQr: {
      type: "boolean",
      nullable: true
    }
  },
  if: {
    properties: {
      isPrivate: {
        anyOf: [
          {type: "null"},
          {const: false}
        ]
      }
    }
  },
  then: {
    required: []
  },
  else: {
    required: ["password"]
  },
  required: ["title", "originUrl"],
  additionalProperties: false,
  errorMessage: {
    processOriginalUrl: "Our short link cannot be used as Origin URL"
  }
};


export const urlUpdateSchema: JSONSchemaType<UrlSchema> = {
  type: "object",
  processOriginalUrl: true,
  properties: {
    title: {
      type: "string",
      nullable: true,
      maxLength: 100
    },
    originUrl: {
      type: "string",
      nullable: true,
      format: "uri",
    },
    isPrivate: {
      type: "boolean",
      nullable: true
    },
    password: {
      type: "string",
      nullable: true,
      minLength: 8
    },
    description: {
      type: "string",
      nullable: true,
      maxLength: 300
    },
    plusQr: {
      type: "boolean",
      nullable: true
    }
  },
  additionalProperties: false,
  errorMessage: {
    processOriginalUrl: "Our short link cannot be used as Origin URL"
  }
};