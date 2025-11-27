import WebNavBar from '@/app/components/WebNavBar';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Linking, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Conditionally import Drawer only on native platforms
const Drawer = Platform.OS === 'web' ? null : require('expo-router/drawer').Drawer;

export default function RootLayout() {
  // Use Stack navigation for web, Drawer for native
  if (Platform.OS === 'web') {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#E3350D" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E3350D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Pokédex",
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <WebNavBar />
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://github.com/SrBarkleyJ")}
                    style={{ marginRight: 15 }}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold'
                    }}>
                      GitHub
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="regions/index"
            options={{
              title: "Regiones Pokémon",
              headerRight: () => <WebNavBar />,
            }}
          />
          <Stack.Screen
            name="type-calculator/index"
            options={{
              title: "Calculadora de Tipos",
              headerRight: () => <WebNavBar />,
            }}
          />
          <Stack.Screen
            name="pokemon/[id]"
            options={{
              title: "Detalles Pokémon",
              headerRight: () => <WebNavBar />,
            }}
          />
          <Stack.Screen
            name="regions/[name]"
            options={{
              title: "Región",
              headerRight: () => <WebNavBar />,
            }}
          />
          <Stack.Screen
            name="guess-pokemon/index"
            options={{
              title: "¿Quién es ese Pokémon?",
              headerRight: () => <WebNavBar />,
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    );
  }

  // Native platforms use Drawer
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#E3350D" />
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E3350D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#E3350D',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Pokédex",
            title: "Pokédex",
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => Linking.openURL("https://github.com/SrBarkleyJ")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="logo-github" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="regions/index"
          options={{
            drawerLabel: "Regiones",
            title: "Regiones Pokémon",
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => Linking.openURL("https://github.com/SrBarkleyJ")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="logo-github" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="type-calculator/index"
          options={{
            drawerLabel: "Calculadora de Tipos",
            title: "Calculadora de Tipos",
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="calculator" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => Linking.openURL("https://github.com/SrBarkleyJ")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="logo-github" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="guess-pokemon/index"
          options={{
            drawerLabel: "¿Quién es ese Pokémon?",
            title: "¿Quién es ese Pokémon?",
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="game-controller" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => Linking.openURL("https://github.com/SrBarkleyJ")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="logo-github" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="pokemon/[id]"
          options={{
            drawerItemStyle: { display: 'none' },
            title: "Detalles Pokémon"
          }}
        />
        <Drawer.Screen
          name="regions/[name]"
          options={{
            drawerItemStyle: { display: 'none' },
            title: "Detalles Región"
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
