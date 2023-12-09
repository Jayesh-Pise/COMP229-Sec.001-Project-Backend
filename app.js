const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

//require('./db/conn');
require('./db/conn');

app.use(cors()); 
app.use(cookieParser());
app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}. http://localhost:${PORT}`);
});
