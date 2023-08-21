import z from 'zod';

export const restaurantSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'El Nombre Es Requerido.',
        invalid_type_error: 'El Nombre Debe Ser Texto.',
      })
      .min(2, { message: 'El Nombre Debe Tener Más Caracteres.' })
      .max(70, { message: 'El Nombre No Puede Ser Muy Largo.' }),
    address: z
      .string({
        required_error: 'La Dirección Es Requerida.',
        invalid_type_error: 'La Dirección Debe Ser Texto.',
      })
      .min(10, { message: 'La Dirección Debe Ser Más Especifica.' }),
    rating: z
      .number({
        required_error: 'La Calificación Es Requerida.',
        invalid_type_error: 'La Calificación Debe Ser Un Número.',
      })
      .min(1, { message: 'La Calificación Mínima Es 1.' })
      .max(5, { message: 'La Calificación Máxima es 5.' }),
  }),
});
