import { HistoryDTO } from "@dtos/history.dto";
import { HStack, Heading, Text, VStack } from "native-base";

type HistoryCardProps = {
  data: HistoryDTO
}

export function HistoryCard ({ data }: HistoryCardProps) {
  return (
    <HStack w="full" px={5} py={4} mb={3} bg="gray.600" alignItems="center" rounded="md">
      <VStack flex={1} mr={5}>  
        <Heading color="white" fontSize="md" textTransform="capitalize" fontFamily="heading">
          {data.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      
      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  )
}