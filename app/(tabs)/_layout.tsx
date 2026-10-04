import { Text } from 'react-native'
import { Tabs } from 'expo-router'
import { colors } from '../../constants/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() { const insets = useSafeAreaInsets(); return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.deep, tabBarInactiveTintColor: '#819092', tabBarStyle: { height: 64 + insets.bottom, paddingBottom: 6 + insets.bottom, paddingTop: 5, backgroundColor: '#FFFFFF', borderTopColor: colors.line }, tabBarItemStyle: { flex: 1, minWidth: 0 }, tabBarLabelStyle: { fontSize: 9, fontWeight: '700' }, tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 17 }}>{route.name === 'index' ? '⌂' : route.name === 'scan' ? '⌁' : route.name === 'streak' ? '♨' : route.name === 'pet' ? '◉' : '●'}</Text> })}><Tabs.Screen name="index" options={{ title: 'Home' }} /><Tabs.Screen name="scan" options={{ title: 'Scan', tabBarActiveTintColor: colors.aqua }} /><Tabs.Screen name="streak" options={{ title: 'Streak' }} /><Tabs.Screen name="pet" options={{ title: 'Pet' }} /><Tabs.Screen name="profile" options={{ title: 'Profile' }} /></Tabs> }
