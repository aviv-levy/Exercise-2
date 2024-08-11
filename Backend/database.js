
const mysql = require('mysql2');

//MySql Connection
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()



//Get all items in cart
async function getCart() {
    const [rows] = await pool.query("SELECT * FROM items")
    return rows;
}

// const myCart = await getCart();

// Get all data of user by username.
async function getUserByUsername(username) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users
        WHERE username = ?
        `, [username])
    return rows[0];
}

// Get all data of user by id.
async function getUserById(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users
        WHERE id = ?
        `, [id])
    return rows[0];
}


async function getItem(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM cart
        WHERE id = ?
        `, [id])
    return rows[0];
}

// const myItem = await getItem(4);

// Create New user in user table.
// Return the ID of inserted row.
async function createUser(firstname, lastname, username, password) {
    const [result] = await pool.query(`
        INSERT INTO users (firstname, lastname, username, password,isEditor,isAdmin)
        VALUES (?,?,?,?,false,false)
        `, [firstname, lastname, username, password])

    return result.insertId;
}

//const result = await createItem('Tomato','vevgetable');


module.exports = {
    pool,
    createUser,
    getUserByUsername,
    getUserById,
};