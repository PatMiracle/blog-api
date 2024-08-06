import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

interface User {
  _id: string;
}

function generateToken(user: User) {
  const payload = {
    userId: user._id,
  };

  const options = {
    expiresIn: '1h', // Token expires in 1 hour
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(createError(401, 'No token provided'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Invalid token'));
  }
}

export { generateToken, verifyToken };
