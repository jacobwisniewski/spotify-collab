import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { getPublicSpotifyUserData } from "../spotify"
import UserProfileUsecase from "../usecases/UserProfileUsecase"

config()

const router = express.Router()
router.use(cors())
router.use(cookieParser())

router.get("/:spotifyId", async (req, res) => {
  const spotifyId = req.params.spotifyId
  const accessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN]

  console.log(`/api/users/${spotifyId}: GET Spotify User Data`)

  try {
    const spotifyProfile = await UserProfileUsecase.getSpotifyProfile(accessToken, spotifyId)
    res.send(spotifyProfile)
  } catch (error) {
    throw error
  }
})

export default router
