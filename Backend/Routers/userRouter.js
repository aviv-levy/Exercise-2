const express = require("express");
const {getUserById } = require("../Database/Users");
const router = express.Router();

//http://localhost:4600/user
// Response all user details except sensitive data
router.get('/', async (req, res) => {
    try {
        const user = await getUserById(req.id);
        user.password = undefined;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = router;