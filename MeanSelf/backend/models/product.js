const mongoose=require('mongoose');
let Product = new mongoose.Schema({
    name:{ type: String},
    email:{ type: String},
    mobile:{ type: Number},
    price:{ type: Number},
});

module.exports = mongoose.model('Product', Product)