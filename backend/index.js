const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const app = express();
const mainRouter = require('./routes/mainRoute');

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use("/api/v1",mainRouter);

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})