import z from 'zod';
import { MealStatus } from '../types/meal.types';

export const mealSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'El Nombre Es Requerido.',
        invalid_type_error: 'El Nombre Debe Ser Texto',
      })
      .min(2, {
        message: 'El Nombre Debe Ser De Mínimo 2 Caracteres.',
      })
      .max(120, {
        message: 'El Nombre Debe Ser De Máximo 2 Caracteres.',
      }),
    price: z
      .number({
        required_error: 'El Precio Es Requerido.',
        invalid_type_error: 'El Precio Debe Ser Númerico.',
      })
      .positive({ message: 'El Precio Debe Ser Positivo.' })
      .min(1, { message: 'El Precio Mínimo Es 1.' }),
    status: z.optional(z.enum([MealStatus.available, MealStatus.disabled]), {
      required_error: 'El Estado De Usuario Es Requerido.',
      invalid_type_error: 'El Estado De Usuario Debe Ser Valido.',
    }),
  }),
});
