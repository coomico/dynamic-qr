import mongoose from "mongoose";
import {
  dbHost,
  dbName,
  dbPass,
  dbPort,
  dbUser
} from "../utils/envs";

const ConnectDB = async () => {
  try {
    const mongoUri: string = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin&directConnection=true`;
    await mongoose.connect(mongoUri);
    console.log('DB is connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default ConnectDB;