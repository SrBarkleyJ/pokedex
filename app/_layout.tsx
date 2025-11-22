import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Linking, StatusBar, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
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
            drawerIcon: ({ color, size }) => (
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
            drawerIcon: ({ color, size }) => (
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
