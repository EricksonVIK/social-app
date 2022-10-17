const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// tells which database to connect - MONGODB_URI is the heroku app in environmental variable
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pizza-hunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
