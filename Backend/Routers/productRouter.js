const express = require("express");
const Router = express.Router();
const { getProducts, createProduct } = require("../Database/Products");
const { validatePost } = require("../Validations/ProductValidation")




// http://localhost:4600/product/getAllProducts
Router.get('/getAllProducts', async (req, res) => {
    try {
        const Products = await getProducts();
        console.log(Products);
        if (Products === null)
            res.status(404).send('not found any')

        res.status(200).json(Products);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//http://localhost:4600/product/addProduct
// Add new Product to products table.
Router.post('/addProduct', async (req, res) => {
    try {
        req.body.date = req.body.date.toString().split('T')[0]; // "YYYY-MM-DD"
        const { name, barcode, description, type, date } = req.body

        const valRes = validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            return res.status(400).send(valRes.error);
        }

        await createProduct(name, barcode, description, type, date); // Sql insert query

        res.status(201).send('Product added')
    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = Router;



// let dateObj = new Date(req.body.date);

// // Extract the day, month, and year
// let day = String(dateObj.getDate()).padStart(2, '0');
// let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
// let year = dateObj.getFullYear();

// // Format the date as dd-mm-yyyy
// req.body.date = `${day}-${month}-${year}`;