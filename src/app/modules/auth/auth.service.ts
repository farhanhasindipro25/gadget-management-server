import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { JWTHelpers } from '../../../common/helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

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

  const { needsPasswordChange } = doesUserExist;

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
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};