import { Center, Image, Text, VStack, Heading, ScrollView, useToast } from "native-base";
import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesprops } from '@routes/auth.routes'
import { SigninDTO } from "@dtos/signin.dto";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "@utils/validations/signin.schema";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/app.error";
import { Loading } from "@components/Loading";

export function Signin () {
  const { navigate } = useNavigation<AuthNavigatorRoutesprops>()

  const toast = useToast()

  const { signin, isLoadingUserData } = useAuth()

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SigninDTO>({
    resolver: yupResolver(signinSchema)
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignin ({ email, password }: SigninDTO) {
    setIsLoading(true)
    try {
      await signin(email, password)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível logar'
      
      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })

      setIsLoading(false)
    }
  }

  function goToSignup () {
    navigate("signup")
  }

  if (isLoadingUserData) {
    return <Loading />
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
            Acesse sua conta
          </Heading>

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

          <Button 
            title="Acessar" 
            onPress={handleSubmit(handleSignin)}
            disabled={isLoading || !isValid}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar conta"
            variant="outline"
            onPress={goToSignup}
          />
          </Center>
      </VStack>
    </ScrollView>
  )
}