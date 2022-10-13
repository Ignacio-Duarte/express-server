"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newUser_1 = require("../controllers/newUser");
const router = (0, express_1.Router)();
router.post("/", newUser_1.newUser);
exports.default = router;
