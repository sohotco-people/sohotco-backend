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
exports.updateMe = exports.getUser = exports.getMe = void 0;
const user_1 = require("models/user");
const positions_on_users_1 = require("models/positions_on_users");
const bundle_1 = require("utils/bundle");
const generator_1 = require("utils/generator");
const experiences_on_users_1 = require("models/experiences_on_users");
const weeks_on_users_1 = require("models/weeks_on_users");
const locations_on_users_1 = require("models/locations_on_users");
const meeting_systems_on_users_1 = require("models/meeting_systems_on_users");
const meeting_times_on_users_1 = require("models/meeting_times_on_users");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = (0, bundle_1.bundleCookieToObject)(req.headers.cookie);
        const user_id = Number(params.user_id);
        const user = yield (0, user_1.getUser)(user_id);
        if (!user)
            return;
        const data = (0, bundle_1.bundleUser)(user);
        res.status(200).json((0, bundle_1.bundleResponseData)({ data }));
    }
    catch (err) {
        (0, generator_1.errorGenerator)({
            res,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});
exports.getMe = getMe;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user_id = Number(id);
        if (!user_id)
            throw (0, bundle_1.bundleResponseError)({ statusCode: 400, message: 'KEY_ERROR' });
        const user = yield (0, user_1.getUser)(user_id);
        if (!user)
            return;
        const data = (0, bundle_1.bundleUser)(user);
        res.status(200).json((0, bundle_1.bundleResponseData)({ data }));
    }
    catch (err) {
        (0, generator_1.errorGenerator)({
            res,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});
exports.getUser = getUser;
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, link, intro, positions, experiences, weeks, locations, meeting_systems, meeting_times, } = req.body;
        const params = (0, bundle_1.bundleCookieToObject)(req.headers.cookie);
        const user_id = Number(params.user_id);
        if (!!name || !!link || !!intro) {
            yield (0, user_1.updateUser)(user_id, name, link, intro);
        }
        if (!!positions) {
            yield (0, positions_on_users_1.deletePositionOnUserByUserId)({ user_id });
            yield positions.forEach((position_id) => (0, positions_on_users_1.createPositionOnUser)({ user_id, position_id }));
        }
        if (!!experiences) {
            yield (0, experiences_on_users_1.deleteExperienceOnUserByUserId)({ user_id });
            yield experiences.forEach((experience_id) => (0, experiences_on_users_1.createExperienceOnUser)({ user_id, experience_id }));
        }
        if (!!weeks) {
            yield (0, weeks_on_users_1.deleteWeekOnUserByUserId)({ user_id });
            yield experiences.forEach((week_id) => (0, weeks_on_users_1.createWeekOnUser)({ user_id, week_id }));
        }
        if (!!locations) {
            yield (0, locations_on_users_1.deleteLocationOnUserByUserId)({ user_id });
            yield experiences.forEach((location_id) => (0, locations_on_users_1.createLocationsOnUser)({ user_id, location_id }));
        }
        if (!!meeting_systems) {
            yield (0, meeting_systems_on_users_1.deleteMeetingSystemOnUserByUserId)({ user_id });
            yield experiences.forEach((meeting_system_id) => (0, meeting_systems_on_users_1.createMeetingSystemOnUser)({ user_id, meeting_system_id }));
        }
        if (!!meeting_times) {
            yield (0, meeting_times_on_users_1.deleteMeetingTimeOnUserByUserId)({ user_id });
            yield experiences.forEach((meeting_time_id) => (0, meeting_times_on_users_1.createMeetingTimeOnUser)({ user_id, meeting_time_id }));
        }
        const user = yield (0, user_1.getUser)(user_id);
        if (!user)
            return;
        const data = (0, bundle_1.bundleUser)(user);
        res.status(200).json((0, bundle_1.bundleResponseData)({ data }));
    }
    catch (err) {
        (0, generator_1.errorGenerator)({
            res,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});
exports.updateMe = updateMe;
