const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
dotenv.config({
  path: './env'
})
var corsOptions = {
  origin: "*",
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./models/index");

let indexRoutes = require('./routes/index');
app.use('/api/v1/', indexRoutes);


const port = process.env.port || 8082;
app.listen(port, () => {
  console.log(`Server is up and running at: http://localhost:${port}`);
});
