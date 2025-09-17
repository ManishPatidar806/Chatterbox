import mongoose from "mongoose";
import { DB_NAME } from "../constraints.js";

const connection = async () => {
  try {
    console.log(`${process.env.MONGODB_URL}/${DB_NAME}`);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      ` DB CONNECTION IS RUNNING AT : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDb Connection Creation Failed :${error}`);
    process.exit(1);
  }
};

export default connection;
