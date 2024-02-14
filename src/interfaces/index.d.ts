import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      gadget: JwtPayload | null;
    }
  }
}
