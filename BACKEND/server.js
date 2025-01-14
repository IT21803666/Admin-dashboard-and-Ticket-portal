const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection Success!");
});

const adminRouter= require("./routes/admin");
app.use("/admin",adminRouter);


const ticketRouter= require("./routes/ticket");
app.use("/ticket",ticketRouter);

const supportRouter= require("./routes/support");
app.use("/support",supportRouter);

const managerRouter= require("./routes/manager");
app.use("/manager",managerRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
