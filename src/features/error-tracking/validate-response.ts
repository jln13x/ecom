import { z, ZodSchema } from "zod";

export const validateResponse = async <TSchema extends ZodSchema>(
  data: any,
  schema: TSchema,
): Promise<z.infer<typeof schema>> => {
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    return parsed.data;
  }

  return Promise.reject(parsed.error.issues);
};
