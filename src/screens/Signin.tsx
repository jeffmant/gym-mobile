import { Center, Image, Text, VStack, Heading, ScrollView } from "native-base";
import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesprops } from '@routes/auth.routes'

export function Signin () {
  const { navigate } = useNavigation<AuthNavigatorRoutesprops>()

  function handleNewAccount () {
    navigate("signup")
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

          <Input 
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input 
            placeholder="Senha"
            secureTextEntry 
          />

          <Button title="Acessar" />
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
            onPress={handleNewAccount}
          />
          </Center>
      </VStack>
    </ScrollView>
  )
}