const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');
const { productValidationRules, validate } = require('../middlewares/validator');
const { Validator } = require('node-input-validator');
const { findByIdAndDelete } = require('../models/product');

router.get('/products', async(req, res) => {

    try {
        let product = await Product.find({});
        res.send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/products/:productId', async(req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.productId } //Products that are match with params id
        );
        if (!product) res.status(400).send('Product ID is not found!');
        res.send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
 
router.put('/products/:productId',productValidationRules(), validate , async(req, res) => {
    
    const file = req.files.file;
try{
    await file.mv(`../client/public/uploads/${file.name}`, function(err) {
        if (err) {
            console.log(err);
            if (!file) res.status(400).send('Image should be uploaded ...');
            res.status(500).send("Error uploading image...");  
        }
    });
    
    //update first approach   
    let product = await Product.findOneAndUpdate({ _id: req.params.productId }, {
            $set: {
                name: req.body.productName,
                price: req.body.price,
                qty: req.body.qty,
                category: req.body.category,
                imagePath: file.imagePath
            }
        }, { new: true, useFindAndModify: false }

    );
    if (!product) res.status(400).send('Product ID is not found!');
    res.send(await product.save());
}
   catch(e){
    res.status(500).send(e.message);
   }

}); 

router.post('/products', async(req, res) => {

    const file = req.files.file;
    console.log(req.files.file)

    try {

        const validationObj = new Validator(req.body, {
            productName: 'required|minLength:5',
            price: 'required|integer',
            qty: 'required|integer',
            category: 'required',
            files: 'object'
        });

        // validate user input
        if (!await validationObj.check()) {
            return res.status(422).send(validationObj.errors);
        }

        await file.mv(`../client/public/uploads/${file.name}`, function(err) {
            if (err) {
                console.log(err);
                if (!file) res.status(400).send('Image should be uploaded ...');
                res.status(500).send("Error uploading image...");
            }
        });

        let product = new Product({
            name: req.body.productName,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            imagePath: file.imagePath,
        });

        res.send(await product.save());
    } catch (e) {
        res.status(500).send(e.message);
    }

});

router.delete('/products/:productId',async(req,res)=>{
    try{
        let product = await Product.findByIdAndDelete(
            {_id : req.params.productId}         
            )
            if (!product) res.status(400).send('Product ID is not found!');
            res.send(product);
        
            }
    
    catch(e){
        res.status(404).send(e);
    }       

});



module.exports = router;