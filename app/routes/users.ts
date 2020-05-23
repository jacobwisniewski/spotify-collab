import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { getPublicSpotifyUserData } from "../spotify"

config()

const router = express.Router()
router.use(cors())
router.use(cookieParser())

router.get("/:spotifyId", async (req, res) => {
  // Check the DB for existing data on spotify user
  const spotifyId = req.params.spotifyId
  console.log(`/api/users/${spotifyId}: GET Spotify User Data`)
  try {
    const userSpotifyProfileData = await getPublicSpotifyUserData(spotifyId)
    res.send(userSpotifyProfileData)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router
