// Define your validations here

import { z } from "zod";

const signUp = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    contactNo: z.string(),
    address: z.string(),
    profileImg: z.string().url().optional(),
  }),
});

const signIn = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
  }),
});

export const AuthValidation = {
  signUp,
  signIn,
};
