import z from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})




export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['user', 'admin', 'manager', 'data-entry']).default('user')
});

export const userUpdateValidationSchema = z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    role: z.enum(['user', 'admin', 'manager', 'data-entry']).optional()
});



export const changePasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  passwordConfirm: z.string().min(6, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  message: "New password and confirmation do not match",
  path: ["passwordConfirm"], // set the error on the confirm field
});
