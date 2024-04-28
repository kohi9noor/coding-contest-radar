require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connectDb = await mongoose.connect(process.env.DBURL);
    console.log(`
    mongodb connected
    url: ${process.env.DBURL}
    `);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  PORT: process.env.PORT,
  connectDB,
};
