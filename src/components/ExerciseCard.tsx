import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps & {

}

export function ExerciseCard ({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image 
          source={{ uri: "https://academiaironhealth.com.br/wp-content/uploads/revslider/3-dicas-para-estruturar-melhor-seu-treino/treino-ABC.jpg" }}
          alt="Imagem do exercícios"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading
            color="white"
            fontSize="lg"
            fontFamily="heading"
          >
            Remada Unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>

    </TouchableOpacity>
  )
}