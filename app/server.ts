import express, { Express, Request, Response} from "express"
import AuthRoute from "./routes/auth"
import UsersRoute from "./routes/users"
import * as path from "path"
import { main } from "./db/connect"


export class ExpressServer {
  private app: Express

  constructor(app: Express) {
    this.app = app

    this.app.use(express.static(path.resolve("./") + "/build/frontend"))

    this.app.use("/api/auth", AuthRoute)
    this.app.use("/api/users", UsersRoute)

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve("./") + "/build/frontend/index.html")
    })

  }

  public start(port: number): void {
    main()
    this.app.listen(port, () => console.log(`Server listening on port: ${port}`))

  }
}