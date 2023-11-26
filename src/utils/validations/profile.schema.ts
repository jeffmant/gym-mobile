import * as Yup from 'yup'

export const profileSchema = Yup.object({
  name: Yup
    .string()
    .required('Informe o nome'),
  password: Yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirmPassword: Yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais')
    .when('password', {
      is: (Field: any) => Field,
      then: () => Yup
        .string()
        .nullable()
        .required('Informe a confirmação de senha')
        .transform((value) => !!value ? value : null), 
    })
})