import express from "express";
import initDatabase from "@database";
import { userRoute } from "@routes/UserRoute";

export const apiRoutes = express.Router();

initDatabase();

apiRoutes.use("/user", userRoute);
