import express, { Request, Response, NextFunction } from "express"
import AuthRoute from "./routes/auth"
import UsersRoute from "./routes/users"
import * as path from "path"
import { main } from "./db/queries"

const app = express()

app.use(express.static(path.resolve("./") + "/build/frontend"))

app.use("/api/auth", AuthRoute)
app.use("/api/users", UsersRoute)

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve("./") + "/build/frontend/index.html")
})

interface Error {
  status?: number
  message?: string
}

app.use(async (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const { status = 500, message = "An error occured." } = error
    console.log("Error status: ", status)
    console.log("Message: ", message)
    res.status(status)
    res.send({ status, message })
  } catch (error) {
    next(error)
  }
})

export async function start(port: Number) {
  try {
    await main()
  } catch (error) {
    throw error
  }
  app.listen(port, () => console.log(`Server listening on port: ${port}`))
}
