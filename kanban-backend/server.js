const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require("././config/dbconnect");

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(express.json());

const dataRoute = require('./routes/dataRoutes');
const userRoute = require('./routes/userRoutes');

app.use(cors());

app.use('/api/v1/', dataRoute);
app.use('/api/v1/users', userRoute);

app.listen(process.env.PORT, function () {
  console.log(`App listening on ${process.env.PORT}`.yellow.bold);
});
