const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {createUser} = require('../Database/Users.js');
const { validatePost } = require('../Validations/UserRegisterValidation.js');



// http://localhost:4600/register
// Create new user in users table.
router.post('/', async (req, res) => {

    try {
        delete req.body.rePassword
        //  Validate the request with the JOI model
        const valRes = validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            console.log(valRes.error);

            return res.status(400).send(valRes.error);
        }
        // Encrypt password
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const { firstname, lastname, username, password } = req.body

        // Create a new user
        await createUser(firstname, lastname, username, password);

        res.status(201).send('User has been created')

    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;