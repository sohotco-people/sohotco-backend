"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorGenerator = void 0;
const bundle_1 = require("utils/bundle");
const errorGenerator = ({ res, statusCode = 500, message = 'SEVER_ERROR', }) => {
    res.status(statusCode).json((0, bundle_1.bundleResponseError)({
        statusCode,
        message,
    }));
};
exports.errorGenerator = errorGenerator;
