import { Stack } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, Linking } from 'react-native';

export default function RootLayout() {
  return (
    <>
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
            headerTitle: () => (
              <Text style={{ 
                color: '#fff', 
                fontSize: 26, 
                fontWeight: 'bold' 
              }}>
                Pokédex
              </Text>
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
                  Mi perfil de GitHub
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen 
          name="pokemon/[id]" 
          options={{ 
            title: "Detalles Pokémon"
          }}
        />
      </Stack>
    </>
  );
}
