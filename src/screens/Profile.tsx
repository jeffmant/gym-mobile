import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Icon, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuth } from "@hooks/useAuth";

import userPhotoDefault from '@assets/userPhotoDefault.png'

const PHOTO_SIZE = 32

export function Profile () {
  const { user } = useAuth()

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, selectUserPhoto] = useState('')

  const toast = useToast()

  async function handleSelectImage () {
    setPhotoIsLoading(true)
  
    try {
      const selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if (selectedImage.canceled) {
        return
      }
  
      if (selectedImage.assets?.[0]?.uri) {
        const photoInfo = await FileSystem.getInfoAsync(selectedImage.assets[0].uri, { size: true }) as any

        if (photoInfo?.size && (photoInfo.size / 1024 / 1024) > 3 ) {
          return toast.show({
            title: "'Imagem muito grande. Por favor, escolha uma de até 3MB'",
            placement: 'top',
            bgColor: "red.500"
          })
        }

        selectUserPhoto(selectedImage.assets[0].uri)
      }
      
    } catch (error) {
      console.error
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
                source={user.avatar ? { uri: user.avatar } : userPhotoDefault}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
            )
          }

          <TouchableOpacity onPress={handleSelectImage}>
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

          <Heading color="gray.200" fontSize="md" mb={2} mt={4} alignSelf="flex-start" fontFamily="heading">
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