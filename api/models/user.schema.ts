import { Document, model, Schema } from "mongoose";
import { MongoError } from "mongodb";
import bcrypt from "bcryptjs";

import { ErrorCapture } from "../utils/error_capture";
import { isEmailValid } from "../utils/regex";

export interface IUser extends Document {
  name: string,
  username: string,
  email: string,
  password: string,
  tokens: string[],     /*  TODO: make it erasable when already expired */
  createdAt?: NativeDate,
  updatedAt?: NativeDate,
  comparePassword(password: string): Promise<boolean>
};

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmailValid
  },
  password: {
    type: String,
    required: true
  },
  tokens: {
    type: [String],
    required: true,
    default: undefined
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const passwordHash = await bcrypt.hash(this.password, 8);
  this.password = passwordHash;
  next();
});

UserSchema.post('save', { errorHandler: true}, function(error, doc, next) {
  if ((error as MongoError).code === 11000 && error.name === 'MongoServerError') {
    next(new ErrorCapture('user with that username or email already exists'));
  } else {
    next(new ErrorCapture(error.message, 500));
  }
});

UserSchema.method('comparePassword', async function(password: string) {
  const match = await bcrypt.compare(password, this.password);
  return match;
});

export default model<IUser>('user', UserSchema);