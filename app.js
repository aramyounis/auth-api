const express = require("express");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();

const apiErrorHandler = require("./middlewares/error/api_error_handler");

//bang krdnaway routeakanman
const auth = require("./routes/Auth");
const home = require("./routes/home");

//midlwares
//po pishandanaway requestakan la consolea
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//route root
app.use(home);

//midlware routers
//bakar henani routeakanman la regai midleware
app.use("/auth", auth);

//midlware error handler
//handel krdni error
app.use(apiErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
