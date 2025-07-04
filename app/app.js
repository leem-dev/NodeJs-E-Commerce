import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import productsRoute from "../routes/productRoute.js";
import categoriesRouter from "../routes/categoriesRoute.js";
import brandsRouter from "../routes/brandsRoute.js";

// db Connect
dbConnect();
const app = express();
// pass incoming data
app.use(express.json());
// routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRoute);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);

// err middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;
