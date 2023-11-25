import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 32

export function Profile () {
  const [photoIsLoading, setPhotoIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setPhotoIsLoading(false)
    }, 3000)
  }, [])

  return (
    <VStack flex={1}>
      <Header title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ? (
              <Skeleton 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
                rounded="full" 
                startColor="gray.500" 
                endColor="gray.400" 
              />
            ) : (
              <UserPhoto
                source={{ uri: 'https://github.com/jeffmant.png' }}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
            )
          }

          <TouchableOpacity>
            <Text 
              color="green.500" 
              fontWeight="bold" 
              fontSize="md" 
              mt={2} 
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            bg="gray.600"
            placeholder="Email"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} mt={4} alignSelf="flex-start">
            Alterar senha
          </Heading>

          <Input 
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input 
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input 
            bg="gray.600"
            placeholder="Confirme nova senha"
            secureTextEntry
          />

          <Button 
            title="Atualizar"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}