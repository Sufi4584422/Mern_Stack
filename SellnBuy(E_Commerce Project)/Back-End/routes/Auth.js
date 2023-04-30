const express = require("express");
// import express from "express";
const router = express.Router();

const { check } = require("express-validator");

const authController = require("../controllers/Auth");
// import authController from "../controllers/Auth";

router.post(
  "/registeruser",
  [
    check("username").isEmail().withMessage("Invalid email"),

    check("password").trim().isLength({ min: 6 }),
  ],
  authController.postUserSignup
);

router.post("/login", authController.postUserLogin);

module.exports = router;
// export default router;
