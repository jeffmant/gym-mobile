import * as Yup from 'yup'

export const signinSchema = Yup.object({
  email: Yup.string().required('Informe o email').email('E-mail inválido'),
  password: Yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
})