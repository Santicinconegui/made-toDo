import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "The name is required",
  }),
  lastname: z.string({
    required_error: "The lastname is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string({
      required_error: "The password is not valid",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
