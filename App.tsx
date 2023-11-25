import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, Spinner } from 'native-base';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/auth.context';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthContextProvider>
        { fontsLoaded ? <Routes /> : <Spinner /> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}