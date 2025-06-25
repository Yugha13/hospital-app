import { useEffect, Suspense } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';
import { StatusBar } from 'expo-status-bar';

import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1 }} />;
  }

  try {
    return (
      <SafeAreaProvider>
        <Suspense fallback={<View style={{ flex: 1 }} />}>
          <LanguageProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </LanguageProvider>
        </Suspense>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }
}