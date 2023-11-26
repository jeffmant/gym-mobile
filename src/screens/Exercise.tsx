import { Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { AppError } from "@utils/app.error";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/exercise.dto";
import { Loading } from "@components/Loading";
import { AppRoutesNavigatiorProps } from "@routes/app.routes";

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise () {
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingRegister, setIsSendingRegister] = useState(false)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const { goBack, navigate } = useNavigation<AppRoutesNavigatiorProps>()

  const toast = useToast()
  const route = useRoute()

  const { exerciseId } = route.params as RouteParamsProps

  async function fetchExerciseById () {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar o exercício'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseDone () {
    setIsSendingRegister(true)
    try {
      await api.post('/history', { exercise_id: exerciseId })
     
      toast.show({
        title: 'Exercício registrado no histórico',
        placement: 'top',
        color: 'green.700'
      })

      navigate('history')

    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível registrar o exercício'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsSendingRegister(false)
    }
  }

  function handleReturn () {
    goBack()
  }

  useEffect(() => {
    fetchExerciseById()
  }, [exerciseId])

  return (
    <VStack flex={1}>
        <VStack px={8} bg="gray.600" pt={12}>
          <TouchableOpacity onPress={handleReturn}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
            <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
              {exercise.name}
            </Heading>

            <HStack>
              <BodySvg />
              <Text color="gray.300" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        { isLoading ? 
          <Loading /> : 
          <ScrollView>
            <VStack p={8}>
              <Box rounded="lg" mb={3} overflow="hidden">
                <Image 
                  w="full"
                  h={80}
                  source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                  alt="Foto do exercício"
                  mb={3}
                  resizeMode="cover"
                  rounded="lg"
                />
              </Box>

              <Box bg="gray.600" rounded="md" pb={4} px={4} >
                <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                  <HStack>
                    <SeriesSvg />
                    <Text color="gray.200" ml={2}>
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionsSvg />
                    <Text color="gray.200" ml={2}>
                      {exercise.repetitions} Repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button 
                  title="Marcar como realizado"
                  onPress={handleExerciseDone}
                  isLoading={isSendingRegister}
                />
              </Box>
            </VStack>
          </ScrollView>
        }
    </VStack>
  )
}