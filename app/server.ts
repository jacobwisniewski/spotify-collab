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

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "An error occured." } = error
  console.log("Error status: ", status)
  console.log("Message: ", message)
  res.status(status)
  res.send({ message })
})

export function start(port: Number) {
  main()
  app.listen(port, () => console.log(`Server listening on port: ${port}`))
}
