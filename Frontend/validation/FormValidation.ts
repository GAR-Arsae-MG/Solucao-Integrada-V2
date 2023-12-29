import * as z from 'zod'

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: 'Nome Inválido' }),
    email: z.string().min(2, { message: 'Um Email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Sua senha precisa ter ao menos 6 caracteres!' }),
})

export const SignInValidation = z.object({
    email: z.string().min(2, { message: 'Um Email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Sua senha precisa ter ao menos 6 caracteres!' }),
})

export const RevalidatePasswordValidation = z.object({
    email: z.string().min(2, { message: 'Um Email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Sua nova senha precisa ter ao menos 6 caracteres!' }),
})