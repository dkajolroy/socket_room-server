import express from "express";
import cors from "cors";
import { Socket } from "socket.io";
import http from "http";
const app = express();

//configure app
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
