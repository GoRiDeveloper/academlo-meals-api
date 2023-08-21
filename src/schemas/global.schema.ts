import z from 'zod';

export const idParamsSchema = z.object({
  params: z.object({
    id: z.string().transform((val, ctx) => {
      const parsed = parseInt(val);

      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El ID Debe Ser Un Número.',
        });
        return z.NEVER;
      }

      return parsed;
    }),
  }),
});

export const restaurantIdParamsSchema = z.object({
  params: z.object({
    restaurantId: z.string().transform((val, ctx) => {
      const parsed = parseInt(val);

      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El ID Debe Ser Un Número.',
        });
        return z.NEVER;
      }

      return parsed;
    }),
  }),
});
