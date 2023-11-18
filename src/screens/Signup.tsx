import { Center, Image, Text, VStack, Heading, ScrollView } from "native-base";
import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Signup () {
  const { goBack } = useNavigation()

  function handleGoBack () {
    goBack()
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

          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input 
            placeholder="Senha"
            secureTextEntry 
          />

          <Button title="Criar e acessar" />
        </Center>

        <Button 
          mt={24}
          title="Voltar"
          variant="outline"
          onPress={handleGoBack} 
        />

      </VStack>
    </ScrollView>
  )
}