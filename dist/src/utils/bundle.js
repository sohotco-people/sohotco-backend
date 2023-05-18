"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleCookieToObject = exports.bundleUser = exports.bundleWithIdName = exports.bundleResponseError = exports.bundleResponseData = void 0;
const node_querystring_1 = __importDefault(require("node:querystring"));
const constant_1 = require("utils/constant");
const bundleResponseData = ({ data, statusCode = 200, message = 'SUCCESS', }) => {
    return { data, statusCode, message };
};
exports.bundleResponseData = bundleResponseData;
const bundleResponseError = ({ statusCode = 500, message = 'SEVER_ERROR', }) => {
    return { statusCode, message };
};
exports.bundleResponseError = bundleResponseError;
const bundleWithIdName = ({ id, name }) => {
    return { id, name };
};
exports.bundleWithIdName = bundleWithIdName;
const bundleUser = (user) => {
    return Object.assign(Object.assign({}, user), { positions: user.positions.map((item) => (0, exports.bundleWithIdName)(item.position)), experiences: user.experiences.map((item) => (0, exports.bundleWithIdName)(item.experience)), weeks: user.weeks.map((item) => (0, exports.bundleWithIdName)(item.week)), locations: user.locations.map((item) => (0, exports.bundleWithIdName)(item.location)), meeting_systems: user.meeting_systems.map((item) => (0, exports.bundleWithIdName)(item.meeting_system)), meeting_times: user.meeting_times.map((item) => (0, exports.bundleWithIdName)(item.meeting_time)) });
};
exports.bundleUser = bundleUser;
const bundleCookieToObject = (cookie) => {
    const cookieValues = cookie.replace(`${constant_1.COOKIE_KEY}=`, '');
    const cookieInfo = node_querystring_1.default.parse(decodeURIComponent(cookieValues));
    return cookieInfo;
};
exports.bundleCookieToObject = bundleCookieToObject;
