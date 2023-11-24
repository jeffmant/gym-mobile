import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack, FlatList } from "native-base";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { useState } from "react";

export function Home () {
  const [selectedGroup, setSelectedGroup] = useState('costa')
  const [groups, setGroups] = useState(['costas', 'biceps', 'triceps', 'ombro'])
  
  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup === item} 
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />


    </VStack>
  )
}