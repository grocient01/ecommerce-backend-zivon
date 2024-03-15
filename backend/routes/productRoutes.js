const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);



// admin route
router.post("/add-product", addProduct)
router.put("/edit-product", editProduct)
router.delete("/delete-product" , deleteProduct)

module.exports = router;
