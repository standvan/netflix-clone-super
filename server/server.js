const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const UserRouter = require("./Routes/UserRouter");
const MovieRouter = require("./Routes/MovieRouter");
const CategoryRouter = require("./Routes/CategoryRouter");
const UploadRouter = require("./Routes/UploadRouter");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(errorHandlerMiddleware);
// Routes
app.get("/", (res, req) => {
  req.send("hello word");
});
app.use("/api/users", UserRouter);
app.use("/api/movies", MovieRouter);
app.use("/api/upload", UploadRouter);
app.use("/api/category", CategoryRouter);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
