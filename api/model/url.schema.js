import mongoose, { Schema } from "mongoose";
import crypto from 'crypto';

const urlSchema = new Schema({
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
  QrCode: {
    type: String,
  },
}, {timestamps: true});

urlSchema.pre('save', async function() {
  const passwordHash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(this.Password).digest('hex');
  this.Password = passwordHash;
});


export default mongoose.model('urldb', urlSchema);;