import z from 'zod';
import { UserStatus, UserRole } from '../types/user.types';

export const userSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'El Nombre Es Requerido.',
        invalid_type_error: 'El Nombre Debe Ser Un Texto.',
      })
      .min(2, { message: 'El Nombre Debe Tener Más De Un Caracter.' })
      .trim()
      .toLowerCase(),
    email: z
      .string({
        required_error: 'El E-Mail Es Requerido.',
        invalid_type_error: 'El E-Mail Debe Ser Un Texto.',
      })
      .email({ message: 'El E-Mail No Es Valido.' })
      .trim()
      .toLowerCase(),
    password: z
      .string({
        required_error: 'La Contraseña Es Requerida.',
        invalid_type_error: 'La Contraseña Debe Ser Un Texto.',
      })
      .trim(),
    status: z.optional(z.enum([UserStatus.available, UserStatus.disabled]), {
      required_error: 'El Estado De Usuario Es Requerido.',
      invalid_type_error: 'El Estado De Usuario Debe Ser Valido.',
    }),
    role: z.optional(
      z.enum([UserRole.admin, UserRole.normal], {
        invalid_type_error: 'El Rol Debe Ser Texto.',
      })
    ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'El E-Mail Es Requerido.',
        invalid_type_error: 'El E-Mail Debe Ser Un Texto.',
      })
      .email({ message: 'El E-Mail No Es Valido.' })
      .trim()
      .toLowerCase(),
    password: z.string({
      required_error: 'La Contraseña Es Requerida.',
      invalid_type_error: 'La Contraseña Debe Ser Un Texto.',
    }),
  }),
});
