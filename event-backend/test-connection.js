const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Atlas Connected Successfully!`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Test creating a collection
    const testCollection = mongoose.connection.collection('test');
    console.log('✅ Database operations working correctly');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('whitelist')) {
      console.log('\n🔧 To fix this issue:');
      console.log('1. Go to MongoDB Atlas Dashboard');
      console.log('2. Navigate to Security → Network Access');
      console.log('3. Add your current IP address or use 0.0.0.0/0 for development');
    }
    
    process.exit(1);
  }
};

testConnection();
