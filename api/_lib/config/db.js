const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxurystay', opts).then((mongoose) => {
      console.log('MongoDB Connected successfully (new connection)');
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`Error: ${error.message}`);
    // Do not crash the process in a serverless environment
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
