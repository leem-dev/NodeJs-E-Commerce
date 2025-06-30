import express from "express";
import {
  createProductCtrl,
  getProductsCtrl,
} from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRoute = express.Router();

productsRoute.post("/", isLoggedIn, createProductCtrl);
productsRoute.get("/", getProductsCtrl);

export default productsRoute;
