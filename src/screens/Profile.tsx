import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import * as Yup from 'yup'

import userPhotoDefault from '@assets/userPhotoDefault.png'
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/app.error";
import { api } from "@services/api";
import { profileSchema } from "@utils/validations/profile.schema";
import { ProfileDTO } from "@dtos/profile.dto";

const PHOTO_SIZE = 32

export function Profile () {
  const { user, updateUserProfile } = useAuth()

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, selectUserPhoto] = useState('')
  const [isLoading, setIsLoading] = useState(false)
 
  const toast = useToast()
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileDTO>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) as unknown as Resolver<ProfileDTO, any>
  })

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

        const fileExtension = selectedImage.assets?.[0]?.uri.split('.').pop()

        const imageFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: selectedImage.assets?.[0]?.uri,
          type: `${selectedImage.assets?.[0]?.type}/${fileExtension}`
        } as any

        const uploadForm = new FormData()
        uploadForm.append('avatar', imageFile)

        const { data } = await api.patch('/users/avatar', uploadForm, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })

        const updatedUser = user
        updatedUser.avatar = data.avatar

        await updateUserProfile(updatedUser)

        toast.show({
          title: 'Foto atualizada com sucesso!',
          placement: 'top',
          color: 'red.500'
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível atulizar a imagem'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate (data: ProfileDTO) {
    setIsLoading(true)
    try {

      const updatedUser = user;
      updatedUser.name = data.name

      await api.put('/users', data)

      await updateUserProfile(updatedUser)

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        color: 'green.500'
      })
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível atualizar o perfil'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsLoading(false)
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
                source={
                  user.avatar ? 
                  { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : 
                  userPhotoDefault
                }
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

          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
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
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Email"
                isDisabled
                value={value}
                onChangeText={onChange}
              />  
            )}
          />

          <Heading color="gray.200" fontSize="md" mb={2} mt={4} alignSelf="flex-start" fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name="oldPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />  
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
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
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme nova senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
              />  
            )}
          />

          <Button 
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isLoading}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}