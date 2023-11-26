import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE } from "./config";

type AuthToken = {
  token: string
  refreshToken: string
}

export async function saveToken({ token, refreshToken }: AuthToken) {
  await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify({ token, refreshToken }))
}

export async function getToken() {
  const storedTokens = await AsyncStorage.getItem(TOKEN_STORAGE)

  const { token, refreshToken }: AuthToken = storedTokens ? JSON.parse(storedTokens) : {} 

  return { token, refreshToken }
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}