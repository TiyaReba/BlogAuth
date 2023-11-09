const express = require("express");
const app = new express();

const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("dev"));
require("dotenv").config();
require("./Db/connection");
app.use(cors());

const PORT = process.env.PORT;

const postRouter = require("./Routes/postRoute");
app.use("/api", postRouter);

const userRouter = require("./Routes/userRoute");
app.use("/api", userRouter);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
