import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error("Error: MONGO_URI is not defined in environment variables.");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...", mongoUri);

    const conn = await mongoose.connect(mongoUri);
    
    console.log(`✅ MongoDB Connected`);
    console.log(`💻 Host: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
    } else {
      console.error("❌ An unknown MongoDB error occurred", error);
    }
    
    process.exit(1);
  }
};

export default connectDB;