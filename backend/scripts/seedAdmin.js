require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' MongoDB Connected');
  } catch (error) {
    console.log(' Connection Error:', error.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const User = require('../models/User');

    // Delete old admin 
    await User.deleteOne({ email: 'admin@email.com' });

    // Create new admin with NEW credentials
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',    
      password: 'admin123',         
      role: 'admin'
    });

    console.log(' New Admin Created Successfully!');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.log(' Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
