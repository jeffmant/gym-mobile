import { UserDTO } from "@dtos/user.dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./config";

export async function saveUser (user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getUser () {
  const storedUser = await AsyncStorage.getItem(USER_STORAGE)
  const user: UserDTO = storedUser ? JSON.parse(storedUser) : {}

  return user
}

export async function removeUser () {
  await AsyncStorage.removeItem(USER_STORAGE)
}