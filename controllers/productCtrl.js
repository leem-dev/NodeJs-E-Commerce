import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";

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

  // find the category
  const categoryFound = await Category.findOne({
    name: category,
  });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
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
  categoryFound.products.push(product._id);
  // resave
  await categoryFound.save();
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

  // pagination
  // page
  const page = parseInt(safeQuery.page) ? parseInt(safeQuery.page) : 1;
  // limit
  const limit = parseInt(safeQuery.limit) ? parseInt(safeQuery.limit) : 10;
  // startIdx
  const startIndex = (page - 1) * limit;
  // endIdx
  const endIndex = page * limit;
  // total records
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //  pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.next = {
      page: page - 1,
      limit,
    };
  }
  // await the query
  const products = await productQuery;

  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Product fetched successfully",
    products,
  });
});

// @desc      Get single product
// @route     GET /api/products/:id
// @access    Public

export const getProductCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  const product = await Product.findById(safeQuery.id);

  if (!product) {
    throw new Error("Product not found");
  }

  res.json({
    status: "success",
    message: "Product fetched successfully",
    product,
  });
});

// @desc      update product
// @route     GET /api/products/:id/update
// @access    Private/Admin

export const updateProductCtrl = asyncHandler(async (req, res) => {
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

  const safeQuery = Object.assign({}, req.params);
  console.log(safeQuery.id);
  // update
  const product = await Product.findByIdAndUpdate(
    safeQuery.id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});

// @desc      delete product
// @route     DELETE /api/products/:id/update
// @access    Private/Admin

export const deleteProductCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  await Product.findByIdAndDelete(safeQuery.id);

  res.json({
    status: "success",
    message: "Product deleted successfully",
  });
});
