import dotenv from 'dotenv';

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';

import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';

dotenv.config({ path: '.env' });

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get('/', (_req, res: Response) => {
  res.send('welcome');
});

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// Custom error interface with an optional status property
interface CustomError {
  status?: number;
  message?: string;
}

// error handler
app.use(function (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: 'InternalServerError' });
});

// connect to db and listen on port

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`server running at ${port}`));
  })
  .catch((e) => console.log(e));
