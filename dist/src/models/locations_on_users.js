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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationOnUserByUserId = exports.createLocationsOnUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLocationsOnUser = ({ user_id, location_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.locationsOnUsers.create({
        data: {
            user_id,
            location_id,
        },
    });
});
exports.createLocationsOnUser = createLocationsOnUser;
const deleteLocationOnUserByUserId = ({ user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.locationsOnUsers.deleteMany({
        where: { user_id },
    });
});
exports.deleteLocationOnUserByUserId = deleteLocationOnUserByUserId;
