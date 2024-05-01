import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI + "/shorturl?authSource=admin&directConnection=true"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    console.log("DB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  };
};

export default connectDB;