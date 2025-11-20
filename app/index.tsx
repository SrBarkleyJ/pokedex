import React, { useEffect, useState } from "react";

import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Text,
  SafeAreaView,
  RefreshControl 
} from "react-native";
import { useRouter } from 'expo-router';
import { getPokemons } from "@/src/types/api/pokeapi";
import PokemonCard from "@/src/types/components/PokemonCard";
import { PokemonListItem } from '../src/types/pokemon';

export default function HomeScreen() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [generation, setGeneration] = useState(1);
  
  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (): Promise<void> => {
    try {
      setError(null);
      const data = await getPokemons(151, 0);
      console.log(`Loaded ${data.results.length} pokémons`);
      setPokemons(data.results);
    } catch (err: any) {
      setError(err.message);
      console.error('Error in loadPokemons:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    loadPokemons();
  };

  const handlePokemonPress = (pokemon: PokemonListItem): void => {
    const pokemonId: string = pokemon.url.split('/').slice(-2, -1)[0];
    
    // SOLUCIÓN: Usar href en lugar de pathname
    router.push({
      pathname: `/pokemon/${pokemonId}` as any, // TypeScript workaround
      params: { name: pokemon.name }
    } as any);
  };

  // O MEJOR AÚN: Usar la forma más simple que sí funciona
  const handlePokemonPressSimple = (pokemon: PokemonListItem): void => {
    const pokemonId: string = pokemon.url.split('/').slice(-2, -1)[0];
    
    router.push({
  pathname: '/pokemon/[id]',
  params: { id: pokemonId, name: pokemon.name }
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadPokemons}>
          Presiona para reintentar
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item: PokemonListItem) => item.name}
        renderItem={({ item }: { item: PokemonListItem }) => (
          <PokemonCard 
            pokemon={item}
            onPress={() => handlePokemonPressSimple(item)} // Usar la versión simple
          />
        )}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#E3350D']}
            tintColor={'#E3350D'}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  listContent: {
    padding: 8
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  errorText: {
    fontSize: 16,
    color: '#E3350D',
    textAlign: 'center',
    marginBottom: 10
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline'
  }
});