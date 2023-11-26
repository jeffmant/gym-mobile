import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/exercise.dto";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppRoutesNavigatiorProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/app.error";
import { VStack, Text, HStack, FlatList, Heading, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home () {
  const { navigate } = useNavigation<AppRoutesNavigatiorProps>()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [groups, setGroups] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  function handleOpenExerciseDetails (exerciseId: string) {
    navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    setIsLoading(true)
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
      setSelectedGroup(data?.[0])

      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar os grupos'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchExercisesByGroup () {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/exercises/bygroup/${selectedGroup}`)
      setExercises(data)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar os exercícios'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect((useCallback(() => {
    fetchExercisesByGroup()
  }, [selectedGroup])))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup?.toUpperCase() === item?.toUpperCase()} 
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      {
        isLoading ? <Loading /> : 
          <VStack flex={1} px={8}>
            <HStack justifyContent="space-between" mb={5}>
                <Heading color="gray.200" fontSize="md" fontFamily="heading">
                  Exercícios
                </Heading>

                <Text color="gray.200" fontSize="md">{exercises.length}</Text>
            </HStack>

            <FlatList 
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)} />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 8 }}
            />
          </VStack>
        }
    </VStack>
  )
}