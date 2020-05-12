import express from "express"
import fs from "fs"
import https from "https"

import AuthRoute from "./routes/auth"
import UsersRoute from "./routes/users"

const options = {
  key: fs.readFileSync("./certs/server-key.pem"),
  cert: fs.readFileSync("./certs/server-cert.pem")
}

const app = express()
const port = 5000

app.use("/api/auth", AuthRoute)
app.use("/api/users", UsersRoute)

https.createServer(options, app).listen(port, () => {
  console.log(`Server started at https://localhost:${port}`)
})
