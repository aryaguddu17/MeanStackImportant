var {db}=require('../db');
let Product = require('../models/product');

exports.addProduct = ((req, res, next) => {
    db.Product.insertOne(req.body)
//     let prod = new Product({
//         name: req.body.name,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         price: req.body.price
//     });
//    prod.save().then(doc => {
//         console.log(doc);
//         res.status(201).json({
//             data: doc
//         })
//     }).catch(err => {
//         console.error(err)
//     })
})
