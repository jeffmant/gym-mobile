import { Center, Image, Text, VStack, Heading, ScrollView, useToast } from "native-base";
import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/app.error";
import { SignupDTO } from "@dtos/signup.dto";
import { signupSchema } from "@utils/validations/signup.schema";
import { useAuth } from "@hooks/useAuth";

export function Signup () {
  const { goBack } = useNavigation()
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignupDTO>({
    resolver: yupResolver(signupSchema)
  })

  const { signin } = useAuth()

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  function handleGoBack () {
    goBack()
  }

  async function handleSignup ({ 
    name, 
    email, 
    password, 
  }: SignupDTO) {
    setIsLoading(true)

    try {
      await api.post('/users', {
        name,
        email,
        password
      })

      await signin(email, password)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível cadastrar.'
      toast.show({ 
        placement: 'top',
        bgColor: "red.500", 
        title: errorMessage
      })
      setIsLoading(false)
    }
    
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
                errorMessage={errors.name?.message as string}
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
                errorMessage={errors.email?.message as string}
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
                errorMessage={errors.password?.message as string}
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
                errorMessage={errors.confirmPassword?.message as string}
                onSubmitEditing={handleSubmit(handleSignup)}
                returnKeyType="send"
              />
            )} 
          />

          <Button 
            title="Criar e acessar" 
            onPress={handleSubmit(handleSignup)}
            disabled={isLoading || !isValid}
            isLoading={isLoading}
          />
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