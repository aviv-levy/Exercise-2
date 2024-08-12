const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validatePost } = require('../Validations/UserLoginValidation.js');
const { getUserByUsername } = require("../Database/Users.js");

// http://localhost:4600/login
Router.post('/', async (req, res) => {

    try {
        let { username, password } = req.body;

        // Validate the request with the JOI model
        const valRes = validatePost({ username, password }); // synchronized method for running validations
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }

        // Create a Mongoose Model based on the JOI Model
        const user = await getUserByUsername(username);
        if (user === undefined)
            return res.status(401).send('Incorrect please try again');

        //      Check the password that sent from user, if it's correct send a token. 
        //      else send Unauthorized http status 401
        if (await bcrypt.compare(password, user.password.toString())) {
            res.json({
                token: jwt.sign({ id: user.id, firstname: user.firstname, lastname: user.lastname }, process.env.SECRET, { expiresIn: '1h' }),
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                isEditor: user.isEditor,
            });
        }
        else
            res.status(401).send('Unauthorized');
    } catch (err) {
        console.log(err.message);
        
        res.status(500).send(err.message);
    }
})



module.exports = Router;