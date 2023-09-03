// Define your validations here

import { z } from "zod";
import { userRole } from "./user.constants";

const updateUserByAdmin = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserByAdmin,
};
