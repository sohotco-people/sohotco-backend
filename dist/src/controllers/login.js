"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthLogin = void 0;
const bundle_1 = require("utils/bundle");
const generator_1 = require("utils/generator");
const node_fetch_1 = __importDefault(require("node-fetch"));
const oauthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        if (!code)
            throw (0, bundle_1.bundleResponseError)({ statusCode: 400, message: 'KEY_ERROR' });
        console.log(code);
        const access_token = yield (0, node_fetch_1.default)(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=56d382231684779a121b84fdb402a224&redirect_uri=http://localhost:8080/login/oauth&code=${code}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
        });
        console.log(access_token.json());
    }
    catch (err) {
        (0, generator_1.errorGenerator)({
            res,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});
exports.oauthLogin = oauthLogin;
