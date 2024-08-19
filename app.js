const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
require('dotenv').config();
const dotenv = require("dotenv");
const { Connect } = require("./config/connect");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//IMPORT ROUTES
const productRoutes = require('./routes/productRoute');
const taskRoutes = require('./routes/taskRoute');
const localRoutes = require('./routes/userRoute');
const seedRoutes = require('./routes/seedRoute');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '100mb',
  extended: true
}));
app.use(cookieParser());
app.use(cors());

//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// get api palpal
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


//dotenv
dotenv.config();
Connect();

//morgan
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


// ROUTES MIDDLEWARE
app.use("/api", productRoutes)
app.use("/api", taskRoutes)
app.use("/api", localRoutes)
app.use("/api", seedRoutes)

module.exports = app;
