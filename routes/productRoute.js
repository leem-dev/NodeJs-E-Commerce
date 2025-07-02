import express from "express";
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRoute = express.Router();

productsRoute.post("/", isLoggedIn, createProductCtrl);
productsRoute.get("/", getProductsCtrl);
productsRoute.get("/:id", getProductCtrl);
productsRoute.put("/:id", isLoggedIn, updateProductCtrl);
productsRoute.delete("/:id/delete", isLoggedIn, deleteProductCtrl);

export default productsRoute;
