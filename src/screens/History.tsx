import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { DailyHistoryDTO } from "@dtos/daily-history.dto";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/app.error";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export function History () {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<DailyHistoryDTO[]>([] as DailyHistoryDTO[])

  const toast = useToast()

  async function fetchHisotry () {
    setIsLoading(true)
    try {
      const { data } = await api.get('/history')
      setExercises(data)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError ? error.message : 'Não foi possível registrar o histórico'
      toast.show({
        title: errorMessage,
        placement: 'top',
        color: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect((useCallback(() => {
    fetchHisotry()
  }, [])))

  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />

      {
        isLoading ? <Loading /> :
          <SectionList 
            sections={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <HistoryCard data={item} />}
            renderSectionHeader={({ section }) => (
              <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                {section.title}
              </Heading>
            )}
            contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: "center" }}
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda hoje. {'\n'}
                Vamos treinar hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
            px={8}
          />
      }

    </VStack>
  )
}