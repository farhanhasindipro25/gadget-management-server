import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { JWTHelpers } from '../../../common/helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = new User();
  const doesUserExist = await user.doesUserExist(email);

  if (!doesUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    doesUserExist.password &&
    !user.doPasswordsMatch(password, doesUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password!');
  }

  const accessToken = JWTHelpers.createToken(
    { email: doesUserExist.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = JWTHelpers.createToken(
    { email: doesUserExist.email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  const user = new User();
  try {
    verifiedToken = JWTHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { email } = verifiedToken;
  // checking deleted user's refresh token
  const doesUserExist = await user.doesUserExist(email);
  if (!doesUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const newAccessToken = JWTHelpers.createToken(
    {
      email: doesUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
