import z from 'zod';

export const reviewSchema = z.object({
  body: z.object({
    comment: z
      .string({
        required_error: 'El Comentario Es Requerido.',
        invalid_type_error: 'El Comentario Debe Ser Texto.',
      })
      .min(15, { message: 'La Reseña Debe Ser Más Especifica.' }),
    rating: z
      .number({
        required_error: 'La Calificación Es Requerida.',
        invalid_type_error: 'La Calificación Debe Ser Un Entero.',
      })
      .int({ message: 'La Calificación Debe Ser Un Entero.' })
      .min(1, { message: 'La Calificación Mínima Es 1.' })
      .max(5, { message: 'La Calificación Máxima es 5.' }),
  }),
});
