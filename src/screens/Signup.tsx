import { Center, Image, Text, VStack, Heading, ScrollView } from "native-base";
import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

type FormDataProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const signupSchema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string().required('Informe o email').email('E-mail inválido'),
  password: Yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  confirmPassword: Yup.string().required('Confirme a senha').oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais'),
})

export function Signup () {
  const { goBack } = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signupSchema)
  })

  function handleGoBack () {
    goBack()
  }

  function handleSignup ({ 
    name, 
    email, 
    password, 
    confirmPassword 
  }: FormDataProps) {
    console.log({ name, email, password, confirmPassword })
  }

  return (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 1 
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='gray.700' px={10}>
        <Image 
          source={BackgroundImage} 
          defaultSource={BackgroundImage}
          alt="Pessoas treinando na academia" 
          resizeMode="contain"
          position="absolute"  
        />

        <Center my={24}>
          <LogoSvg />
          <Text
            color="gray.100"
            fontSize="md"
          >
            Treine seu corpo e sua mente
          </Text>
        </Center>

        <Center>
          <Heading 
            color="gray.100"
            fontSize="xl"
            mb={6}
            fontFamily="heading"
            >
            Crie sua conta
          </Heading>

          <Controller 
            control={control} 
            name="name"

            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control} 
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )} 
          />

          <Controller 
            control={control} 
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )} 
          />

          <Controller 
            control={control} 
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Confirmar Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
                onSubmitEditing={handleSubmit(handleSignup)}
                returnKeyType="send"
              />
            )} 
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignup)} />
        </Center>

        <Button 
          mt={4}
          title="Voltar"
          variant="outline"
          onPress={handleGoBack} 
        />

      </VStack>
    </ScrollView>
  )
}