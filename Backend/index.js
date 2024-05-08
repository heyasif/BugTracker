
const express = require('express');
const cors = require("cors");
const { ConnectDatabase } = require('./config/db');
const { userRouter } = require("./routes/user.routes");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

app.get("/", (req, res) => {
    try {
      res.status(200).send({ msg: "This is Our Homepage." });
    } catch (error) {
      console.log("Error", error);
    }
  });

app.listen(process.env.PORT, () => {
  ConnectDatabase();
  console.log(`Connected Server to Port ${process.env.PORT}`);
});