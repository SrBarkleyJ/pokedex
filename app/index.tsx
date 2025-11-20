import GenerationNavbar from "@/src/components/GenerationNavbar";
import { getPokemons, getPokemonsByGeneration } from "@/src/types/api/pokeapi";
import PokemonCard from "@/src/types/components/PokemonCard";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { PokemonListItem } from '../src/types/pokemon';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedGeneration, setSelectedGeneration] = useState<number>(1);

  // Responsive logic: 1 column for mobile (<768px), 4 for larger screens
  const numColumns = width < 768 ? 1 : 4;

  useEffect(() => {
    loadPokemons();
  }, [selectedGeneration]);

  const loadPokemons = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      let data: PokemonListItem[] = [];

      if (selectedGeneration) {
        data = await getPokemonsByGeneration(selectedGeneration);
      } else {
        const response = await getPokemons(151, 0);
        data = response.results;
      }

      console.log(`Loaded ${data.length} pokémons for Gen ${selectedGeneration}`);
      setPokemons(data);
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

  const handlePokemonPressSimple = (pokemon: PokemonListItem): void => {
    const pokemonId: string = pokemon.url.split('/').slice(-2, -1)[0];

    router.push({
      pathname: '/pokemon/[id]',
      params: { id: pokemonId, name: pokemon.name }
    });
  };

  const handleSelectGeneration = (gen: number) => {
    if (gen !== selectedGeneration) {
      setSelectedGeneration(gen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GenerationNavbar
        selectedGeneration={selectedGeneration}
        onSelectGeneration={handleSelectGeneration}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E3350D" />
          <Text style={styles.loadingText}>Cargando Pokémon...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={loadPokemons}>
            Presiona para reintentar
          </Text>
        </View>
      ) : (
        <FlatList
          key={numColumns} // Force re-render when columns change
          data={pokemons}
          keyExtractor={(item: PokemonListItem) => item.name}
          renderItem={({ item }: { item: PokemonListItem }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => handlePokemonPressSimple(item)}
            />
          )}
          numColumns={numColumns}
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
      )}
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