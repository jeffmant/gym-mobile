import { Center, Heading } from "native-base";

type HeaderProps = {
  title: string
}

export function Header ({ title }: HeaderProps) {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        { title }
      </Heading>
    </Center>
  )
}