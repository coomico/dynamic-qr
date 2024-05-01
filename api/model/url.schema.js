import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const _SALT_ROUNDS_ = 10;

const urlSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Origin: {
    type: String,
    required: true,
  },
  Short: {
    type: String,
    required: true,
  },
  VisitCount: {
    type: Number,
    required: true,
    default: 0,
  },
  CreationDate: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  QrCode: {
    type: String,
  },
});

urlSchema.pre('save', async function() {
  const passwordHash = await bcrypt.hash(this.Password, _SALT_ROUNDS_);
  this.Password = passwordHash;
});

urlSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.Password);
}

export default mongoose.model('urldb', urlSchema);;