require('dotenv').config();// .env config use
require('./database').pool // MySql connection

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// cors open to all
const cors = require('cors');
app.use(cors());



app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status.send('Something broke');
})

// Server run
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
})


const verifyToken = require('./verifyToken');


const registerRouter = require('./Routers/registerRouter.js');
const loginRouter = require('./Routers/loginRouter.js');
const userRouter = require('./Routers/userRouter.js');



app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user',verifyToken, userRouter);


