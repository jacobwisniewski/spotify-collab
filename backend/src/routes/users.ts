import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { randomBytes } from "crypto"
import Integration from "../spotify/Integration"
import Queries from "../db/connect"
import { sign } from "jsonwebtoken"
import { userAuthentication } from "../middleware/authentication"
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
    res.sendStatus(400)
  }
})

export default router
