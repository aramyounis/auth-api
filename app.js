const express = require("express");
const volleyball = require("volleyball");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("dotenv").config();

const apiErrorHandler = require("./middlewares/error/api_error_handler");

//bang krdnaway routeakanman
const auth = require("./routes/Auth");
const home = require("./routes/home");
const get = require("./routes/get");

//midlwares
//po pishandanaway requestakan la consolea
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "''unsafe-inline'",
        "https://unpkg.com/axios@0.20.0-0/dist/axios.min.js",
      ],
    },
  })
);

app.use(cors());
app.use("/static", express.static("public"));
//route root
app.use(home);

//midlware routers
//bakar henani routeakanman la regai midleware
app.use("/auth", auth);

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use("/get", cors(corsOptions), get);
//midlware
//handel krdni error
app.use(apiErrorHandler);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./public/errorPage.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
