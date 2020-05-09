import express from "express"

import AuthRoute from "./routes/auth"
import UsersRoute from "./routes/users"

const app = express()
const port = 5000

app.use("/api/auth", AuthRoute)
app.use("/api/users", UsersRoute)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
