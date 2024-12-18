import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    name: z.string().min(1, {
        message: "Please enter your name"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
})
})

export const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
})

export const organizationInfomationSchema = z.object({
        fullName: z
          .string()
          .min(1, { message: "Name of organization is required" })
          .max(100, { message: "Name of organization cannot exceed 100 characters" }),
        email: z
          .string()
          .email({ message: "Invalid email address" })
          .min(1, { message: "Email is required" }),
        contact: z
          .string()
          .regex(/^\+?\d{10,15}$/, {
            message: "Contact must be a valid phone number with 10-15 digits",
    }),
 });


 export const organizationAddressSchema = z.object({
    address: z.string().url("Please provide a valid URL.")
})

export const organizationBioSchema = z.object({
    bio: z
        .string()
        .min(10, "Bio must be at least 10 characters long.")
        .max(5000, "Bio cannot exceed 500 characters.")
})

export const organizationPaymentSchema = z.object({
  image: z
  .string()
  .url("Invalid image URL.")
  .optional()
  .or(z.literal("")), // Allow empty string as default value
});

export const organizationMediaSchema = z.object({
  image: z
    .string()
    .url("Invalid image URL.")
    .optional()
    .or(z.literal("")), // Allow empty string as default value
});

export const organizationReferenceSchema = z.object({
  images: z.array(z.instanceof(File)),
})