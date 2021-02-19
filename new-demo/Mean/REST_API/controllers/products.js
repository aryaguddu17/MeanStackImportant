const db = require('../database/db');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path=require('path');
const Response = require('../lib/response');
const ObjectId = require('mongodb').ObjectId;



exports.getProducts = async (req, res, next) => {
    const products = await db.getDB().db().collection('products').find().toArray();
    res.status(200).json({
        data: products
    })
};

exports.addProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        let errors = new Error('Invalid Details');
        errors.stattusCode = 401;
        errors.data = error.array();
        throw errors;
    }

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.file;
    const insertedData = await db.getDB().db().collection('products').insertOne({ name: name, price: price, imageUrl: imageUrl });
    res.status(201).json({
        data: insertedData
    })
}

exports.getProductById = async (req, res, next) => {
    const id = req.params.id;
    const product = await db.getDB().db().collection('products').findOne({ _id: new ObjectId(id) });
    res.status(200).json(Response(1, "SuccessFully Data Retrived!.", "SuccessFully Data Retrived!.", "getProductById_Success", product))
}

exports.updateProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        let errors = new Error('Invalid Details');
        errors.stattusCode = 401;
        errors.data = error.array();
        throw errors;
    }
    const name = req.body.name;
    const price = req.body.price;
    const id = req.body.id;
    let imageUrl;
    if (req.file) {
        imageUrl = req.file;
    } else {
        imageUrl = req.body.imageUrl;
    }
    const updatedData = await db.getDB().db().collection('products').updateOne({ _id: new ObjectId(id) }, { $set: { name: name, price: price, imageUrl: imageUrl } })
    res.status(201).json(Response(1, 'SuccessFully Data Updated!', 'SuccessFully Data Updated!', 'productUpdate_Success', updatedData))
}

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    const getByIdProduct = await db.getDB().db().collection('products').findOne({ _id: new ObjectId(id) });
    console.log(getByIdProduct)
    let filePath = path.join(__dirname, '../files', getByIdProduct.imageUrl);
    fs.unlink(filePath, (err) => { console.log(err) });

    const deletedItem = await db.getDB().db().collection('products').deleteOne({ _id: new ObjectId(id) });
    res.status(201).json(Response(1, 'SuccessFully Data Deleted!', 'SuccessFully Data Deleted!', 'deleteProduct_Success', deletedItem))
}