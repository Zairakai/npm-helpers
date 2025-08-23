/**
 * Runtime type validation schemas using Zod
 * Provides runtime type checking that persists after TypeScript compilation
 */

import { z } from 'zod'

// Email validation schema
export const EmailSchema = z.string().email('Invalid email format').min(1, 'Email is required')

// Phone validation schema
export const PhoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')

// URL validation schema
export const UrlSchema = z.string().url('Invalid URL format')

// Date validation schema
export const DateSchema = z.union([
  z.string().datetime(),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  z.date(),
])

// User validation schema
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: EmailSchema,
  name: z.string().min(1, 'Name is required').max(255),
  phone: PhoneSchema.optional(),
  website: UrlSchema.optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
})

// API Response schema
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    errors: z.array(z.string()).optional(),
  })

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().min(1).max(100).default(15),
  total: z.number().int().nonnegative(),
  lastPage: z.number().int().positive(),
})

// Paginated response schema
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: PaginationSchema,
  })

// Configuration schema
export const ConfigSchema = z.object({
  apiUrl: UrlSchema,
  timeout: z.number().int().positive().default(30000),
  retries: z.number().int().nonnegative().default(3),
  debug: z.boolean().default(false),
})

// Export types inferred from schemas
export type Email = z.infer<typeof EmailSchema>
export type Phone = z.infer<typeof PhoneSchema>
export type Url = z.infer<typeof UrlSchema>
export type User = z.infer<typeof UserSchema>
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>
export type Pagination = z.infer<typeof PaginationSchema>
export type PaginatedResponse<T> = z.infer<ReturnType<typeof PaginatedResponseSchema<z.ZodType<T>>>>
export type Config = z.infer<typeof ConfigSchema>

/**
 * Validates data against a schema and throws detailed errors
 */
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`)
    throw new Error(`Validation failed: ${errors.join(', ')}`)
  }

  return result.data
}

/**
 * Validates data against a schema and returns result with success flag
 */
export const safeValidateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`)
  return { success: false, errors }
}
