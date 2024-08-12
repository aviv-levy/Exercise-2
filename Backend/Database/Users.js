const pool = require('./DatabaseConnection');



// Create New user in users table.
// Return the ID of inserted row.
async function createUser(firstname, lastname, username, password) {
    const [result] = await pool.query(`
        INSERT INTO users (firstname, lastname, username, password,isEditor,isAdmin)
        VALUES (?,?,?,?,false,false)
        `, [firstname, lastname, username, password])

    return result.insertId;
}


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


module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
};