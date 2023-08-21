import z from 'zod';
import { OrderStatus } from '../types/order.types';

export const orderSchema = z.object({
  body: z.object({
    mealId: z
      .number({
        required_error: 'El Id De La Comida Es Requerido.',
        invalid_type_error: 'El Id Debe Ser Un Entero.',
      })
      .positive({ message: 'El Id Debe Ser Un Número Positivo.' })
      .int({ message: 'El Id Debe Ser Un Entero.' }),
    quantity: z
      .number({
        required_error: 'La Cantidad Es Requerida.',
        invalid_type_error: 'La Cantidad Debe Ser Un Entero.',
      })
      .int({ message: 'La Cantidad Debe Ser Un Entero.' }),
    status: z.optional(z.enum([OrderStatus.active]), {
      required_error: 'El Estado De La Orden Es Requerido.',
      invalid_type_error: 'El Estado De La Orden Debe Ser Valido.',
    }),
  }),
});
