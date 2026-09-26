
const { z } = require("zod");

// Create User Schema
const createUserSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),

  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),

  age: z.number().int().positive().optional(),

  city: z.string().min(2).optional(),
}).strict();

// Update User Schema (PATCH)
const updateUserSchema = createUserSchema.partial();

module.exports = {
  createUserSchema,
  updateUserSchema,
};

