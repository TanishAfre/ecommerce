const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

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
    const id = req.params;
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate( { id } , req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
});

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
        const findAllProduct = await Product.find();
        res.json(findAllProduct);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct };