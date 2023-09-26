// Your service code here

import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getProfile = async (user: JwtPayload) => {
  return await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const ProfileService = {
  getProfile,
};
