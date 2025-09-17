require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./Models/UserSchema');
const bcrypt = require('bcryptjs');
const db = require('./db');

async function run() {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    // remove test user if exists
    await User.deleteOne({ email: 'comparetest_local@example.com' });

    const plain = 'LocalTestPass123';
    const u = new User({
      name: 'LocalCompare',
      email: 'comparetest_local@example.com',
      password: plain,
      weight: [{ weight: 70, date: Date.now() }],
      height: [{ height: 170, date: Date.now() }],
      gender: 'male',
      dob: '1990-01-01',
      goal: 'maintain',
      activityLevel: 'moderate'
    });

    await u.save();
    console.log('Saved user. Stored password hash length:', u.password.length);

    const compare = await bcrypt.compare(plain, u.password);
    console.log('bcrypt.compare result (plain):', compare);

    const compareTrim = await bcrypt.compare(plain.trim(), u.password);
    console.log('bcrypt.compare result (trim):', compareTrim);

    const compareSync = bcrypt.compareSync(plain, u.password);
    console.log('bcrypt.compareSync result:', compareSync);

    process.exit(0);
  } catch (err) {
    console.error('Test script error:', err);
    process.exit(1);
  }
}

run();
