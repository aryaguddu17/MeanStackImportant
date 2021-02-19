const express=require('express');
var router=express.Router();
var {Product}=require('../models/product');
router.get('/',(req,res) => {
Product.find((req,docs)=>{
    if(!err){
        req.send(docs);
    }else{
        console.log('error to retrive : '+JSON.stringify(err,undefined,2))
    }      
});
});
module.exports=router;