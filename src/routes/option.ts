import express from 'express'
import {
  getExperience,
  getLocations,
  getMeetingSystems,
  getMeetingTimes,
  getPositions,
  getWeeks,
} from 'controllers/option'
const router = express.Router()

// GET
router.get('/weeks', getWeeks)
router.get('/positions', getPositions)
router.get('/locations', getLocations)
router.get('/experiences', getExperience)
router.get('/meeting-times', getMeetingTimes)
router.get('/meeting-systems', getMeetingSystems)

export default router
