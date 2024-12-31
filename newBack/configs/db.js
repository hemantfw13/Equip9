const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://hemant:ahire@cluster0.q4s62o3.mongodb.net/equipApp?retryWrites=true&w=majority"
  
);

module.exports = {
  connection,
};
