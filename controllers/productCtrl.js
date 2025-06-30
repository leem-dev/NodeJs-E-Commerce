import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  // if product already exist
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }

  // create the product
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });

  // push the product created into the list of categories
  // send response
  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

// @desc      Get all products
// @route     Get /api/v1/products
// @access    Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({
    status: "success",
    products,
  });
});
