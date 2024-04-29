const express = require("express");
const { PORT, connectDB } = require("./config/config");
const contestRoutes = require("./routes/Contest.route");
const shedule = require("./services/remind");
const cors = require("cors");
const main = () => {
  const app = express();
  // middlware for passing data in the boyd client to server - server to client in json format

  app.use(express.json());
  app.use(cors());

  app.use(express.urlencoded({ extended: true }));
  app.use("/api", contestRoutes);

  connectDB();

  shedule();
  app.listen(PORT, () => {
    console.log(`Server is running at this PORT: ${PORT}`);
  });
};

module.exports = main;
