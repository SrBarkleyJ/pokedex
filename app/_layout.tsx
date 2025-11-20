import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

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
            title: "Pokédex"
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