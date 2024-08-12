const pool = require('./DatabaseConnection.js');



//Get all Products
async function getProducts() {
    const [rows] = await pool.query("SELECT * FROM products")
    return rows;
}

// Get all data of product by id.
async function getProductById(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users
        WHERE id = ?
        `, [id])
    return rows[0];
}

// Create New product in products table.
// Return the ID of inserted row.
async function createProduct(name, barcode, description, type, date) {
    const [result] = await pool.query(`
        INSERT INTO products (name, barcode, description, type, date)
        VALUES (?,?,?,?,?)
        `, [name, barcode, description, type, date])

    return result.insertId;
}



module.exports = {
    getProducts,
    getProductById,
    createProduct
};