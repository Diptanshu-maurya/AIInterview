
import mongoose from "mongoose";




 async function connectDB(){
     if(!process.env.DATABASE_URL){
        throw new Error (" Database url is not provided in env file");
     }
     try {
       
    //    const DB_OPTIONS = {
    //      dbName: process.env.DBNAME,
    //      user: process.env.DBUSERNAME,
    //      pass: process.env.DBPASSWORD,
    //      authSource: process.env.DBAUTHSOURCE,
    //  };

     await mongoose.connect(process.env.DATABASE_URL)
     console.log("mongodb connection successful")

      
     } catch (error) {
      console.error("MongoDB connection error:", error.message);
      throw new Error("Database connection failed");

      
     }

  }

  export default connectDB;