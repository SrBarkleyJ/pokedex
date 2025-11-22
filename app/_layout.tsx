import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Linking, Platform, StatusBar, Text, TouchableOpacity } from 'react-native';
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
              ),
            }}
          />
          <Stack.Screen
            name="regions/index"
            options={{
              title: "Regiones",
            }}
          />
          <Stack.Screen
            name="pokemon/[id]"
            options={{
              title: "Detalles Pokémon"
            }}
          />
          <Stack.Screen
            name="regions/[name]"
            options={{
              title: "Detalles Región"
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
                <Text style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>
                  GitHub
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="regions/index"
          options={{
            drawerLabel: "Regiones",
            title: "Regiones",
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="map" size={size} color={color} />
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
