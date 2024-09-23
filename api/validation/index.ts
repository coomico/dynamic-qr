import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { passwordSchema } from "./common.schema";
import {
  authLoginEmailSchema,
  authLoginUsernameSchema,
  authRegistSchema
} from "./auth.schema";
import {
  userChangePasswordSchema,
  userUpdateSchema
} from "./user.schema";
import {
  urlCreateSchema,
  UrlSchema,
  urlUpdateSchema
} from "./url.schema";
import { Schema } from "ajv/dist/types";
import { isShortUrl } from "../utils/regex";

const ajv = new Ajv({
  allErrors: true,
  verbose: true
});

addFormats(ajv);
addErrors(ajv /*, {singleError: true} */);

ajv.addKeyword({
  keyword: 'processOriginalUrl',
  validate: (schema: Schema, data: UrlSchema) => {
    if (schema && data.originUrl) {
      try {
        const decoded = decodeURIComponent(data.originUrl);
        if (isShortUrl(decoded)) {
          return false;
        }
      } catch (e) {
        data.originUrl = encodeURI(data.originUrl);
      }
    }

    return true;
  },
  errors: true
});

export const validatePassword = ajv.compile(passwordSchema);

export const validateAuthRegist = ajv.compile(authRegistSchema);
export const validateAuthLoginEmail = ajv.compile(authLoginEmailSchema);
export const validateAuthLoginUsername = ajv.compile(authLoginUsernameSchema);

export const validateUserUpdate = ajv.compile(userUpdateSchema);
export const validateUserChangePassword = ajv.compile(userChangePasswordSchema);

export const validateUrlCreate = ajv.compile(urlCreateSchema);
export const validateUrlUpdate = ajv.compile(urlUpdateSchema);