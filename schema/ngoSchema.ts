import { z } from "zod";

export const ngoSchema = z.object({
  orgName: z.string().min(3, "Organization name is required"),

  email: z.email("Invalid email format"),

  phone: z.string().regex(/^03[0-9]{9}$/, "Phone must be a valid Pakistani number (e.g. 03001234567)"),

  category: z.string().min(1, "Category is required"),

  location: z.string().min(1, "Location is required"),

  description: z.string().min(1, "Description is required"),

  registrationNumber: z.string().min(1, "Registration number is required"),

  cnic: z.string().regex(/^[0-9]{13}$/, "CNIC must be 13 digits (e.g. 4210123456789)"),

  bankName: z.string().min(1, "Bank name is required"),

  accountNumber: z.string().min(1, "Account number is required"),

  iban: z.string().regex(/^PK\d{2}[A-Z]{4}[0-9A-Z]{16}$/, "Invalid IBAN format (e.g. PK36SCBL0000001123456702)"),
});
