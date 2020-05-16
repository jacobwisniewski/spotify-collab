import {ExpressServer} from "./app/server";
import express from 'express';
const app = express();

const port = Number(process.env.PORT) || 5000;

const server = new ExpressServer(app);
server.start(port);