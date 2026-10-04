import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppProvider } from '../state/AppContext'

function RootFrame() {
  const insets = useSafeAreaInsets()

  return <View style={[styles.rootFrame, { paddingTop: insets.top }]}><Stack><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="rewards" options={{ title: 'Loot & Rewards', headerBackTitle: 'Back', headerTintColor: '#0A6B70' }} /></Stack></View>
}

export default function RootLayout() { return <SafeAreaProvider><AppProvider><RootFrame /></AppProvider></SafeAreaProvider> }

const styles = StyleSheet.create({ rootFrame: { flex: 1 } })
