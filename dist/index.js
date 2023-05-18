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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("routes"));
const client_1 = require("@prisma/client");
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: path_1.default.join(`${__dirname}/.env.prod}`) });
}
else {
    dotenv_1.default.config({ path: path_1.default.join(`${__dirname}/.env.local`) });
}
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
const server = http_1.default.createServer(app);
const PORT = process.env.PORT;
app.get('/ping', (req, res) => res.json({ message: '/pong' }));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server.listen(PORT, () => console.log(`SERVER POST >> ${PORT}`));
    }
    catch (err) {
        console.error(`SERVER ERROR >> ${err}`);
        yield prisma.$disconnect();
    }
});
start();
