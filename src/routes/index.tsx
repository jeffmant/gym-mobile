import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";

export function Routes () {
  const { colors } = useTheme()

  const { user } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background= colors.gray['700']

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {
          user?.id ? 
            <AppRoutes /> : 
            <AuthRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}