const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');

router.get('/', async(req, res) => {
    res.send(await Product.find({}));
});

router.get('/:productId',async(req,res)=>{
 try{
     let product = await Product.findOne(
         {_id : req.params.productId} //Products that are match with params id
     );
     res.send(product);
 }
 catch(e){
    res.status(500).send(e.message);
 }
});
router.put('/:productId',async(req,res)=>{
     //update first approach   
    let product = await Product.findOneAndUpdate(
    {_id : req.params.heroId},
    {$set :{    name: req.body.productName,
                price: req.body.price,
                qty: req.body.qty,
                category: req.body.category,
                imagePath: file.name
    }},
    {new : true , useFindAndModify : false}

    );
    res.send(product);
    
});

router.post('/', async(req, res) => {

    const file = req.files.file; 

    if (commonFunctions.handleFileUpload(file)) {

        let product = new Product({
            name: req.body.productName,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            imagePath: file.name,
        })

        res.send(await product.save());
    } else {
        res.status(500).send("Error uploading image...");
    }


});

module.exports = router;