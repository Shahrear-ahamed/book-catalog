import jwt from "jsonwebtoken";
import config from "../config";

interface IToken {
  id: string;
  email: string;
  role: string;
}

const generateToken = async (payload: IToken) => {
  return jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });
};

const generateRefreshToken = async (payload: IToken) => {
  return jwt.sign(payload, config.jwt.refresh_token_secret as string, {
    expiresIn: config.jwt.refresh_token_expires_in,
  });
};

const verifyToken = async (token: string) => {
  return jwt.verify(token, config.jwt.secret as string);
};

const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, config.jwt.refresh_token_secret as string);
};

export const TokenServices = {
  verifyToken,
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
};
