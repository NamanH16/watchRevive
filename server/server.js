const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const bidsRoute = require('./routes/bidsRoute');

// endpoint middleware
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);

app.listen(port, ()=> console.log(`Server started at PORT ${port}`));
