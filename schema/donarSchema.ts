import z from "zod";

export const donarSchmea = z.object({
  fullName: z.string().min(3, 'donar required'),
  email: z.email("Invalid email format"),
  phone: z.string().regex(/^03[0-9]{9}$/, "Phone must be a valid Pakistani number (e.g. 03001234567)"),
  causes: z.array(z.string()).min(1, "Select at least one cause"), 
  donation: z.number().min(2, "Donation must be greater than 0"),
})