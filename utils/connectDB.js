import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DBNAME,
      user: process.env.DBUSERNAME,
      pass: process.env.DBPASSWORD,
      authSource: process.env.DBAUTHSOURCE,
     // useNewUrlParser: true, // Ensures connection uses new URL string parser
     // useUnifiedTopology: true, // Enables new connection management engine
    };

    await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // process.exit(1); // Exit the application if the database connection fails
  }
};

export default connectDB;
