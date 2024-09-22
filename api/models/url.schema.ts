import {
  Document,
  model,
  ObjectId,
  Schema,
  SchemaOptions,
  SchemaTimestampsConfig
} from "mongoose";
import { MongoError } from "mongodb";
import bcrypt from "bcryptjs";

import { ErrorCapture } from "../utils/error_capture";

export interface IUrl extends Document, SchemaTimestampsConfig {
  title: string,
  shortUrl: string,
  originUrl: string,
  isPrivate: boolean,
  password?: string,
  hasPassword: boolean,
  description?: string,
  visitCount: number,
  qrCode?: string,
  owner: ObjectId,
  comparePassword(password: string): Promise<boolean>
}

const UrlSchema = new Schema<IUrl>({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  originUrl: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false
  },
  password: {
    type: String,
    required: function() {
      return this.isPrivate;
    }
  },
  description: {
    type: String
  },
  visitCount: {
    type: Number,
    required: true,
    default: 0
  },
  qrCode: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, {
  timestamps: true
});

const hasPassword = (schema: Schema, options: SchemaOptions) => {
  schema.virtual('hasPassword')
    .get(function() {return !!this.password})
};

UrlSchema.plugin(hasPassword);

UrlSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  if (!this.isPrivate || !this.password) {
    return next()
  }

  const passwordHash = await bcrypt.hash(this.password!, 8);
  this.password! = passwordHash;
  next();
});

UrlSchema.post('save', { errorHandler: true}, function(error, doc, next) {
  if ((error as MongoError).code === 11000 && error.name === 'MongoServerError') {
    next(new ErrorCapture('link already exists'));
  } else {
    next(new ErrorCapture(error.message, 500));
  }
});

UrlSchema.method('comparePassword', async function(password: string) {
  if (!this.isPrivate || !password) {
    throw new ErrorCapture('link is not private or has no password');
  }

  if (!this.password) return false;
  
  const match = await bcrypt.compare(password, this.password);
  return match;
});

export default model<IUrl>('url', UrlSchema);