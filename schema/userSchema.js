import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['user', 'admin', 'manager', 'data-entry']).default('user')
});

export const userUpdateValidationSchema = z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    role: z.enum(['user', 'admin', 'manager', 'data-entry']).optional()
});


export const loginValidationSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(1, "Password is required")
});

export const passwordResetValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});


export const validateUserData = (data) => {
  return userValidationSchema.safeParse(data);
};

export const validateUserDataStrict = (data) => {
  return userValidationSchema.parse(data);
};

export const validateLoginData = (data) => {
  return loginValidationSchema.safeParse(data);
};

export const validatePasswordResetData = (data) => {
  return passwordResetValidationSchema.safeParse(data);
};