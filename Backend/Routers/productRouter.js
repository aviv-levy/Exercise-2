const express = require("express");
const Router = express.Router();
const verifyToken = require('../verifyToken');
const { getProducts, createProduct, deleteProductById, updateProduct } = require("../Database/Products");
const { validatePost } = require("../Validations/ProductValidation")




// http://localhost:4600/product/getAllProducts
// Get all products and send them as json.
Router.get('/getAllProducts', async (req, res) => {
    try {
        const Products = await getProducts();
        if (Products === null)
            res.status(404).send('not found any')

        res.status(200).json(Products);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//http://localhost:4600/product/addProduct
// Add new Product to products table.
Router.post('/addProduct', verifyToken, async (req, res) => {
    try {
        req.body.date = req.body.date.toString().split('T')[0]; // "YYYY-MM-DD"
        const { name, barcode, description, type, date } = req.body

        const valRes = validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            return res.status(400).send(valRes.error);
        }

        await createProduct(name, barcode, description, type, date, req.id); // Sql insert query

        res.status(201).send('Product added')
    } catch (err) {
        console.log(err.message);

        res.status(500).send(err.message);
    }
})

//http://localhost:4500/product/updateProduct
// Update product details.
Router.put('/updateProduct', verifyToken, async (req, res) => {
    try {
        req.body.date = req.body.date.toString().split('T')[0]; // "YYYY-MM-DD"
        const { id, name, barcode, description, type, date } = req.body
        delete req.body.id;
        delete req.body.createdById;
        const valRes = validatePost(req.body);
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }

        await updateProduct(name, barcode, description, type, date, id)

        res.status(201).json('Product has been updated');
    } catch (err) {
        console.log(err.message);

        res.status(500).send(err.message);
    }
})


//http://localhost:4600/product/deleteProduct/:productId
// Delete Product from products table by product id
Router.delete('/deleteProduct/:productId', verifyToken, async (req, res) => {
    try {

        await deleteProductById(req.params.productId) // Sql delete query

        res.status(204).send('Product deleted')
    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = Router;