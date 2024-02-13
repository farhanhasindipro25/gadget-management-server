import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
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

  return {
    
  }
};

export const AuthService = {
  loginUser,
};
