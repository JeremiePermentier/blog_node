import mongoose from 'mongoose';
require('dotenv').config();

exports.clientPromise = mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
)
  .then(() => console.log('Database connection successful!'))
  .catch((err: Error) => console.error('Connection error :', err));
