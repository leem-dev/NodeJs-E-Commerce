import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

// @desc      Create new brand
// @route     POST /api/v1/brand
// @access    Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // check if brand exist
  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error("Brand already exists");
  }

  // create brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

// @desc      Get all brand
// @route     POST /api/v1/brand
// @access    Public

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

// @desc      Get single brand
// @route     POST /api/v1/brand/:id
// @access    Public

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  const brand = await Brand.findById(safeQuery.id);
  console.log(brand);

  res.json({
    status: "success",
    message: "brand fetched successfully",
    brand,
  });
});

// @desc      update brand
// @route     GET /api/brand/:id/update
// @access    Private/Admin

export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const safeQuery = Object.assign({}, req.params);
  console.log(safeQuery.id);
  // update
  const brand = await Brand.findByIdAndUpdate(
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
    message: "brand updated successfully",
    brand,
  });
});

// @desc      delete brand
// @route     DELETE /api/brand/:id/update
// @access    Private/Admin

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
  const safeQuery = Object.assign({}, req.params);
  await Brand.findByIdAndDelete(safeQuery.id);

  res.json({
    status: "success",
    message: "brand deleted successfully",
  });
});
