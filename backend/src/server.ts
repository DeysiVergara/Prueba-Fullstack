// const express = require("express");
import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";

const app = express();
app.use(express.json());

connectDB();
//Leer datos de formularios
app.use("/", router);

export default app;
