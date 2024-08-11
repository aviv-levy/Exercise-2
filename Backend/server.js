require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const cors = require('cors');
app.use(cors());

const mysql = require('./database').pool


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status.send('Something broke');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
})