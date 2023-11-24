import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack, FlatList, Heading } from "native-base";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { useState } from "react";

export function Home () {
  const [selectedGroup, setSelectedGroup] = useState('costa')
  const [groups, setGroups] = useState(['costas', 'biceps', 'triceps', 'ombro'])
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Unilateral', 'Remada Curva', 'Levantamento Terra'])
  
  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toUpperCase() === item.toUpperCase()} 
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="md">{exercises.length}</Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 8 }}
        />
      </VStack>
    </VStack>
  )
}