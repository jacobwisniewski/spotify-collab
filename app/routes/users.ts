import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import UserProfileUsecase from "../usecases/UserProfileUsecase"

config()

const router = express.Router()
router.use(cors())
router.use(cookieParser())

router.get("/:spotifyId", async (req, res, next) => {
  const spotifyId = req.params.spotifyId

  console.log(`/api/users/${spotifyId}: GET Spotify User Data`)

  try {
    const spotifyProfile = await UserProfileUsecase.getSpotifyProfile(spotifyId)
    res.send(spotifyProfile)
  } catch (error) {
    next(error)
  }
})

router.get("/:spotifyId/tracks", async (req, res, next) => {
  const spotifyId = req.params.spotifyId
  const timeRange = String(req.query.time_range)

  console.log(`/api/users/${spotifyId}/tracks: GET Spotify Tracks Data`)

  try {
    const topTracks = await UserProfileUsecase.getUserTopTracks(spotifyId, timeRange)
    res.send(topTracks)
  } catch (error) {
    next(error)
  }
})

router.get("/:spotifyId/artists", async (req, res, next) => {
  const spotifyId = req.params.spotifyId
  const timeRange = String(req.query.time_range)

  console.log(`/api/users/${spotifyId}/artists: GET Spotify Artists Data`)

  try {
    const topArtists = await UserProfileUsecase.getUserTopArtists(spotifyId, timeRange)
    res.send(topArtists)
  } catch (error) {
    next(error)
  }
})
export default router
