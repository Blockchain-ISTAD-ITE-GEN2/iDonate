import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .nonempty("Password is required"),
});

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const organizationInfomationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name of organization is required" })
    .max(100, { message: "Name of organization cannot exceed 100 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z.string().regex(/^\+?\d{10,15}$/, {
    message: "Contact must be a valid phone number with 10-15 digits",
  }),
});

export const organizationAddressSchema = z.object({
  address: z.string(),
});

export const organizationBioSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long.")
    .max(5000, "Bio cannot exceed 500 characters."),
});

export const organizationPaymentSchema = z.object({
  bankAccountNumber: z.string(), // Allow empty string as default value
});

export const organizationMediaSchema = z.object({
  image: z.any(),
  // .refine((file) => file instanceof File, {
  //   message: "Invalid file format. Please upload an image.",
  // })
  // .refine((file) => file.type?.startsWith("image/"), {
  //   message: "Only image files are allowed.",
  // })
  // .refine((file) => file.size <= 2 * 1024 * 1024, {
  //   message: "File size must be 2MB or less.",
  // })
  // .optional(), // Allows empty input initially
});

export const organizationReferenceSchema = z.object({
  images: z.array(z.instanceof(File)),
});

export const donationSchema = z.object({
  eventUuid: z
    .string()
    .uuid("Invalid donation event ID. Must be a valid UUID."),
  // donor: z.string().uuid("Invalid donor ID. Must be a valid UUID."),
  amount: z.number().positive("ចំនួនថវិការបរិច្ចាគ must be greater than zero."),
  // .min(0.01, "Minimum amount is 0.01."),
  // recipient: z.string().uuid("Invalid recipient ID. Must be a valid UUID."),
  acquiringBank: z
    .string()
    .min(1, "Acquiring bank cannot be empty.")
    .max(50, "Acquiring bank cannot exceed 50 characters."),
  currency: z
    .string()
    .length(3, "Currency must be a 3-character code.")
    .regex(
      /^[A-Z]{3}$/,
      "Currency must consist of uppercase letters (e.g., USD).",
    ),
  // timezone: z.string().min(1, "Timezone cannot be empty."),
  city: z
    .string()
    .min(1, "City cannot be empty.")
    .max(100, "City cannot exceed 100 characters."),
  // remark: z
  //   .string()
  //   .max(500, "Remark cannot exceed 500 characters.")
  //   .nullable(),
  // visibily: z.boolean(),
});

export const eventSchemaCreation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  // timezone: z.string(),
  images: z.any().nullable(),
});

export const eventSchemaEdition = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const eventInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  isVisible: z.boolean(),
  isDraft: z.boolean(),
  location: z.string().min(1, { message: "Location is required" }),
  startDate: z.string(),
  endDate: z.string(),
  category: z.string().min(1, { message: "Category is required" }),
  organization: z.string().min(1, { message: "Organization is required" }),
  timezone: z.string(),
  images: z.any(),
});

export const organizationRegistrationSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address, e.g., user@example.com.",
  }),
  name: z
    .string()
    .min(3, {
      message: "Organization name must be at least 3 characters long.",
    })
    .max(100, {
      message: "Organization name must not exceed 100 characters.",
    }),
  description: z.string().nullable(),
  // .min(20, {
  //   message: "Description must be at least 20 characters long.",
  // })
  // .max(500, {
  //   message: "Description must not exceed 500 characters.",
  // }),
  phone: z.string().regex(/^(0\d{8,9}|\+855\d{8,9})$/, {
    message: "Phone number must be in the format 0123456789 or +855123456789.",
  }),
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters long.",
    })
    .max(200, {
      message: "Address must not exceed 200 characters.",
    }),
  image: z.any(),
  // .refine(
  //   (file) =>
  //     file instanceof File &&
  //     ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
  //   {
  //     message: "Please upload a valid image file (JPEG or PNG).",
  //   },
  // ),
  bio: z.string().nullable(),
  // .min(20, {
  //   message: "Bio must be at least 20 characters long.",
  // })
  // .max(300, {
  //   message: "Bio must not exceed 300 characters.",
  // }),
  purpose: z.string().nullable(),
  // .min(20, {
  //   message: "Purpose must be at least 20 characters long.",
  // })
  // .max(300, {
  //   message: "Purpose must not exceed 300 characters.",
  // }),
  referenceInformation: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type),
          {
            message:
              "Please upload a valid file (JPEG, PNG, PDF, DOC, or DOCX).",
          },
        ),
    )
    .nullable(),
  // .min(1, { message: "Please upload at least one reference file." })
  // .max(5, { message: "You can upload up to 5 reference files." }),
});
