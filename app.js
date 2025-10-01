import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import sa1Router from "./routes/sa1.js";
import authRouter from "./routes/auth.js";

const app = express()
const port = 3000

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sa1', sa1Router);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
