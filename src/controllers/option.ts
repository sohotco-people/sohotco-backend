import { Response, Request } from 'express'
import {
  getWeeks as _getWeeks,
  getPositions as _getPositions,
  getLocations as _getLocations,
  getExperiences as _getExperiences,
  getMeetingSystems as _getMeetingSystems,
  getMeetingTimes as _getMeetingTimes,
} from '../../src/models/option'
import { bundleResponseData } from '../../src/utils/bundle'

export const getWeeks = async (req: Request, res: Response) => {
  try {
    const weeks = await _getWeeks()
    if (!weeks) return
    res.status(200).json(bundleResponseData({ data: weeks }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const getPositions = async (req: Request, res: Response) => {
  try {
    const positions = await _getPositions()
    if (!positions) return
    res.status(200).json(bundleResponseData({ data: positions }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await _getLocations()
    if (!locations) return
    res.status(200).json(bundleResponseData({ data: locations }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const getExperience = async (req: Request, res: Response) => {
  try {
    const experiences = await _getExperiences()
    if (!experiences) return
    res.status(200).json(bundleResponseData({ data: experiences }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const getMeetingTimes = async (req: Request, res: Response) => {
  try {
    const meeting_times = await _getMeetingTimes()
    if (!meeting_times) return
    res.status(200).json(bundleResponseData({ data: meeting_times }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const getMeetingSystems = async (req: Request, res: Response) => {
  try {
    const meeting_systems = await _getMeetingSystems()
    if (!meeting_systems) return
    res.status(200).json(bundleResponseData({ data: meeting_systems }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}
