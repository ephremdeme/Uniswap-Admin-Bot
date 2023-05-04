const mongoose  = require("mongoose");

const connectDb = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected..."));

    mongoose.set("debug", true);
  } catch (err) {
    console.error(err.message);
    throw new Error("MongoDB Connection Failed");
  }
};

module.exports = connectDb;