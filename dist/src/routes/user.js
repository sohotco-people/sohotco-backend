"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("controllers/user");
const router = express_1.default.Router();
// GET
router.get('/me', user_1.getMe);
router.get('/:id', user_1.getUser);
// PUT
router.put('/me', user_1.updateMe);
exports.default = router;
