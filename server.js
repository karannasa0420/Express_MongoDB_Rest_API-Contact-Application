// console.log("I am in express project");
const dotenv = require("dotenv").config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;
connectDb();
const app = express();
// whenever we want to use middleware we use [app.use] as in below
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`its running on port ${port}`);
});
