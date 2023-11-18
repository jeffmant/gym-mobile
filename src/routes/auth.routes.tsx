import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Signin } from '@screens/Signin'
import { Signup } from '@screens/Signup'

type AuthRoutes = {
  signin: undefined;
  signup: undefined;
}

export type AuthNavigatorRoutesprops = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes () {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="signin"
        component={Signin} 
      />

      <Screen
        name="signup"
        component={Signup} 
      />
    </Navigator>
  )
}