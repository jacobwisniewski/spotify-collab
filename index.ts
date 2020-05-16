import {ExpressServer} from "./app/server";
import express from 'express';
const app = express();

const port = 5000;

const server = new ExpressServer(app);
server.start(port);