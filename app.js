const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

//bang krdnaway routeakanman
const authRoute = require('./routes/auth.route');
const apiErrorHandler = require('./middlewares/error/api_error_handler');
const homeRoute = require('./routes/home.route');

const app = express();

//midlwares
//po pishandanaway requestakan la consolea
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route root
app.use(homeRoute);

//midlware routers
//bakar henani routeakanman la regai midleware
app.use('/auth', authRoute);

//midlware error handler
//handel krdni error
app.use(apiErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server Started on port: ${PORT}`);
});
