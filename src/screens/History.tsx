import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History () {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.23",
      data: ["Puxada Frontal", "Remada unilateral"]
    },
    {
      title: "24.08.23",
      data: ["Puxada Frontal"]
    },
  ])

  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />

      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
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

    </VStack>
  )
}