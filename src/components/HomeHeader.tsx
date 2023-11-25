import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import userPhotoDefault from '@assets/userPhotoDefault.png'

export function HomeHeader () {
  const { user, signout } = useAuth()

  async function handleSignout () {
    try {
      await signout()
    } catch (error) {
      
    }
  }

  return (
    <HStack bg="gray.500" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={user.avatar ? { uri: user.avatar } : userPhotoDefault}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          { user?.name.split(' ')[0] }
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon 
          as={MaterialIcons} 
          name="logout"
          color="gray.200"
          size={7}
          onPress={handleSignout}
        />
      </TouchableOpacity>
    </HStack>
  )
}