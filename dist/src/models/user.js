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
exports.updateUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id },
        include: {
            positions: {
                select: {
                    position: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            experiences: {
                select: {
                    experience: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            weeks: {
                select: {
                    week: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            locations: {
                select: {
                    location: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            meeting_systems: {
                select: {
                    meeting_system: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            meeting_times: {
                select: {
                    meeting_time: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
});
exports.getUser = getUser;
const updateUser = (id, name, link, intro) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id },
        data: { name, link, intro },
    });
});
exports.updateUser = updateUser;
