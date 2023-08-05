const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


// Get single product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all products
const getAllProduct = asyncHandler(async (req, res) => { 
    try {
        // Filtering 
        const queryObj = { ...req.query };
        const excludeFields = ["page","sort","limit","fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        let query = Product.find (JSON.parse(queryStr));


        // Sorting 
        if (req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else{
            query = query.sort("-createdAt");
        }


        // Limiting the fields
        if (req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.sort("-__v");
        }

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate( { _id: id } , req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const deleteProduct = await Product.findOneAndDelete({ _id: id });
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct };