const mongoose = require("mongoose");

async function dbConfig() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    ()=>{
    console.log("Database connected");
    });

    
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConfig;