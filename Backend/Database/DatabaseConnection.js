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


async function getItem(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM cart
        WHERE id = ?
        `, [id])
    return rows[0];
}

// const myItem = await getItem(4);


//const result = await createItem('Tomato','vevgetable');


module.exports = pool