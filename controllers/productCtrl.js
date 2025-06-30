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
  // query
  let productQuery = Product.find();
  const safeQuery = Object.assign({}, req.query);
  console.log(safeQuery);

  // find user by name
  if (safeQuery.name) {
    productQuery = productQuery.find({
      name: { $regex: safeQuery.name, $options: "i" },
    });
  }

  // find user by brand
  if (safeQuery.brand) {
    productQuery = productQuery.find({
      brand: { $regex: safeQuery.brand, $options: "i" },
    });
  }

  // find user by category
  if (safeQuery.category) {
    productQuery = productQuery.find({
      category: { $regex: safeQuery.category, $options: "i" },
    });
  }

  // find user by colors
  if (safeQuery.color) {
    productQuery = productQuery.find({
      colors: { $regex: safeQuery.colors, $options: "i" },
    });
  }

  // find user by colors
  if (safeQuery.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: safeQuery.sizes, $options: "i" },
    });
  }

  // filter by price range
  if (safeQuery.price) {
    const priceRange = safeQuery.price.split("-");
    // gte: greater or equal
    // lte: less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // await the query
  const products = await productQuery;

  res.json({
    status: "success",
    products,
  });
});
