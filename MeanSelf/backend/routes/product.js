const express=require('express');
var router=express.Router();
var {Product}=require('../models/product');
var productController = require('../controllers/productController');

router.post('/addProduct',productController.addProduct);
module.exports=router;