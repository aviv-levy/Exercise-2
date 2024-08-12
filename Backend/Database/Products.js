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
async function createProduct(name, barcode, description, type, date, createdById) {
    const [result] = await pool.query(`
        INSERT INTO products (name, barcode, description, type, date, createdById)
        VALUES (?,?,?,?,?,?)
        `, [name, barcode, description, type, date, createdById])

    return result.insertId;
}


async function updateProduct(name, barcode, description, type, date, id) {
    const [result] = await pool.query(
        'UPDATE products SET name = ?, barcode = ?, description = ?, type = ?, date = ? WHERE id = ?',
        [name, barcode, description, type, date, id]
    );

    return result;
}


// Delete Product by Id.
async function deleteProductById(id) {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);

    return result;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProductById
};