const { request } = require("express");
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  const { title, price, stock, description, category, thumbnail, size } = req.body;

  if (!title || !price || !stock || !description || !category) {
    return res.status(400).json({
      status: 400,
      message: "productName, price, quantity, description, and type are required fields"
    });
  }

  try {
    const product = await Product.create({...req.body});

    res.status(201).json({
      status: 201,
      data: product,
      message: "New Product added successfully"
    });
  } catch (error) {
    console.log("Error Occurred");
    res.status(400).json({ status: 400, message: error.message });
  }
};

 

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const editProduct = async (req, res) => {
  const { productId } = req.body;
  if(!productId){
    return res.status(404).json({ message: "Product Id is required" });
  }
  try {
    const { productId, updatedDetails } = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedDetails, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product details updated successfully", product });
  } catch (error) {
    console.error("Error updating product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteProduct = async(req,res) =>{
  const { id } = req.body
  if(!id){
    return res.status(404).json({message: 'Product id is required'})
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
}



module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct
};
