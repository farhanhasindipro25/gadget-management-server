import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};

export const JWTHelpers = {
  createToken,
};
