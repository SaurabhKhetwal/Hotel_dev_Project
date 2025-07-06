const UserModel = require('../model/userSchema'); // ✅ Fixed path
const bcrypt = require('bcrypt');
require('dotenv').config(); // ✅ Load .env

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
      const admin = new UserModel({
        userName: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });

      await admin.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('⚠️ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdminUser;
