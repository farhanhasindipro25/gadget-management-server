import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { JWTHelpers } from '../../common/helpers/jwtHelpers';
import config from '../../config';
import ApiError from '../../errors/ApiError';

const authorizeAuthedAction =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to perform this action',
        );
      }
      //verify token
      let verifiedUser = null;
      verifiedUser = JWTHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.gadget = verifiedUser;
      // guarding 
      
      next();
    } catch (error) {
      next(error);
    }
  };

export default authorizeAuthedAction;
