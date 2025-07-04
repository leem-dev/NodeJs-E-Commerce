import express from "express";
import {
  createBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
  deleteBrandCtrl,
} from "../controllers/brandCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", getSingleBrandCtrl);
brandsRouter.put("/:id", isLoggedIn, updateBrandCtrl);
brandsRouter.delete("/:id/", isLoggedIn, deleteBrandCtrl);

export default brandsRouter;
