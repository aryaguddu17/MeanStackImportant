const express = require('express');
const productCtrl = require('../controllers/products');
const { body } = require('express-validator');

const routes = express.Router();

//GET PRODUCTS
routes.get('/getProducts', productCtrl.getProducts);

//POST
routes.post('/addProduct',
    [
        body('name').isString().trim().withMessage('Name must be String type'),
        body('price').isNumeric(),
    ],
    productCtrl.addProduct);

//GET BY ID
routes.get('/getProductById/:id',productCtrl.getProductById);

//PUT 
routes.post('/updateProduct', [
    body('id').isString(),
    body('name').isString().trim().withMessage('Name must be String type'),
    body('price').isNumeric(),
   // body('imageUrl').isEmpty()
], productCtrl.updateProduct);

//GET Delete Product
routes.get('/deleteProduct/:id',productCtrl.deleteProduct);

module.exports = routes;