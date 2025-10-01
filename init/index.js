// init/index.js

const mongoose = require("mongoose");
const initData = require("./data.js");   // your sample listings
const Listing = require("../models/listing");  // Mongoose model

// Database connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // exit if cannot connect
  }
}

// Seed the database
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("🗑️ Deleted existing listings");

    initData.data=initData.data.map((obj)=>({...obj,owner:"68d7df32b3d084f854b6aae3"}))

    await Listing.insertMany(initData.data);
    console.log("🌱 Sample data initialized");

  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await mongoose.connection.close(); // close after seeding
    console.log("🔌 MongoDB connection closed");
  }
};

// Run everything
main().then(initDB);
