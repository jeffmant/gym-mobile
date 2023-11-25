import * as Yup from 'yup'

export const signupSchema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string().required('Informe o email').email('E-mail inválido'),
  password: Yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  confirmPassword: Yup.string().required('Confirme a senha').oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais'),
})