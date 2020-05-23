import { start } from "./app/server"

const port = Number(process.env.PORT) || 5000

start(port)
