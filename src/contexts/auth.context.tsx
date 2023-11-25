import { UserDTO } from "@dtos/user.dto";
import { api } from "@services/api";
import { getToken, removeToken, saveToken } from "@storage/auth.storage";
import { getUser, removeUser, saveUser } from "@storage/user.storage";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO
  signin: (email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  isLoadingUserData: boolean
}
 
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(false) 

  function updateUserAndToken(userData: UserDTO, token: string) {
    setUser(userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async function saveUserAndToken(userData: UserDTO, token: string) {
    await saveUser(userData)
    await saveToken(token)  
  }
 
  async function signin(email: string, password: string) {
    setIsLoadingUserData(true)
    try {
      const { data } = await api.post('/sessions', { email, password })

      if  (data.user && data.token) {
        await saveUserAndToken(data.user, data.token)
        updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function signout () {
    setIsLoadingUserData(true)
    try {
      await removeUser()
      await removeToken()
      setUser({} as UserDTO)

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function loadUserData () {
    setIsLoadingUserData(true)
    try {
      const loggedUser = await getUser()
      const token = await getToken()
  
      if (loggedUser && token) {
        setUser(loggedUser)
        updateUserAndToken(loggedUser, token)
      }
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signin, signout, isLoadingUserData }}>
    { children }
  </AuthContext.Provider>
  )
}