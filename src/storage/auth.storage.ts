import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE } from "./config";

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE, token)
}

export async function getToken() {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE)

  return token
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}