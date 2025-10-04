import mongoose from "mongoose";

const DB_OPTIONS = {
  dbName: process.env.DBNAME,
  user: process.env.DBUSERNAME,
  pass: process.env.DBPASSWORD,
  authSource: process.env.DBAUTHSOURCE,
};

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS);
      cached.conn = await cached.promise;
      console.log("MongoDB connected successfully.");
    } catch (err) {
      console.error("MongoDB connection error:", err.message);
      throw err;
    }
  }

  return cached.conn;
};

export default connectDB;
