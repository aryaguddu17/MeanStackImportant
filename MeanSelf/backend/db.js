const mongoose=require('mongoose');
require('./models/product');
mongoose.connect('mongodb://localhost:27017/Crud',(err) => {
    if(!err)
    console.log('connection successfull');
    else
    console.log('mongodb error'+JSON.stringify(err,undefined,2));
}
);

module.exports=mongoose;