import { object, z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterFormSchema = z
  .object({
    pictureURL: z
      .instanceof(File, {
        message: "Pleas upload a valid image",
      })
      .refine((data) => data.size < 2 * 1024 * 1024, {
        message: "Image must be less than 2MB",
      }),
    displayName: z
      .string()
      .min(1, "Display name is required")
      .max(50, "max 50 characters"),
    email: z.string().email("Enter a valid name"),
    password: z.string().min(6, "put your password"),
    confirmPassword: z.string().min(6, "confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
  });

export const SearchFormShcema = z.object({
  email: z.string().email("Please add a valid email"),
});
