import express from "express";
import { createProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRoute = express.Router();

productsRoute.post("/", isLoggedIn, createProductCtrl);

export default productsRoute;
