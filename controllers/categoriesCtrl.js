import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

// @desc      Create new category
// @route     POST /api/v1/categories
// @access    Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // check if category exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }

  // create category
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

// @desc      Get all categories
// @route     POST /api/v1/categories
// @access    Public

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "success",
    message: "Categories fetched successfully",
    categories,
  });
});

// @desc      Get single categories
// @route     POST /api/v1/categories/:id
// @access    Public

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  const category = await Category.findById(safeQuery.id);
  console.log(category);

  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

// @desc      update category
// @route     GET /api/category/:id/update
// @access    Private/Admin

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const safeQuery = Object.assign({}, req.params);
  console.log(safeQuery.id);
  // update
  const category = await Category.findByIdAndUpdate(
    safeQuery.id,
    {
      name,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Category updated successfully",
    category,
  });
});

// @desc      delete category
// @route     DELETE /api/category/:id/update
// @access    Private/Admin

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  await Category.findByIdAndDelete(safeQuery.id);

  res.json({
    status: "success",
    message: "Category deleted successfully",
  });
});
