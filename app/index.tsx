import GenerationNavbar from "@/app/components/GenerationNavbar";
import { getPokemons, getPokemonsByGeneration } from "@/src/types/api/pokeapi";
import PokemonCard from "@/src/types/components/PokemonCard";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from "react-native";
import { PokemonListItem } from '../src/types/pokemon';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedGeneration, setSelectedGeneration] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

      // Sort pokemons by ID
      data.sort((a, b) => {
        const idA = parseInt(a.url.split('/').slice(-2, -1)[0]);
        const idB = parseInt(b.url.split('/').slice(-2, -1)[0]);
        return idA - idB;
      });

      setPokemons(data);
      setFilteredPokemons(data);
      setSearchQuery(''); // Reset search when generation changes
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

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GenerationNavbar
        selectedGeneration={selectedGeneration}
        onSelectGeneration={handleSelectGeneration}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon por nombre..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

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
          data={filteredPokemons}
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
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5'
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
      }
    })
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 5
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