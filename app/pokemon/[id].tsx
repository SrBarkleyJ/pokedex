import { getPokemonById } from "@/src/types/api/pokeapi";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import abilityTranslations from '../../src/data/abilities_es.json';
import { Pokemon } from '../../src/types/pokemon';

export default function PokemonScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const router = useRouter();

  // Recibir parámetros correctamente y parsearlos a número
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = Number(idParam);
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(id)) {
      loadPokemon();
    } else {
      setError('ID de Pokémon no válido');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const backButton = () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0, marginRight: 10 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    );

    const options: any = {
      headerLeft: backButton,
    };

    if (name) {
      options.title = capitalize(name);
    } else if (pokemon) {
      options.title = capitalize(pokemon.name);
    }

    navigation.setOptions(options);
  }, [name, pokemon]);

  const loadPokemon = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (isNaN(id)) throw new Error('ID de Pokémon no válido');

      const data = await getPokemonById(id);
      setPokemon(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error in loadPokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
      grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>
          {name ? `Cargando ${capitalize(name)}...` : 'Cargando Pokémon...'}
        </Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Pokémon no encontrado"}</Text>
        <Text style={styles.retryText} onPress={loadPokemon}>
          Reintentar
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.spritesContainer}>
            <View style={styles.spriteWrapper}>
              <Text style={styles.spriteLabel}>Normal</Text>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.spriteWrapper}>
              <Text style={styles.spriteLabel}>Shiny</Text>
              <Image
                source={{ uri: pokemon.sprites.front_shiny }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>

          <View style={styles.typesContainer}>
            {pokemon.types.map((typeInfo, index) => (
              <View
                key={index}
                style={[styles.typeBadge, { backgroundColor: getTypeColor(typeInfo.type.name) }]}
              >
                <Text style={styles.typeText}>{capitalize(typeInfo.type.name)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Información Básica</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Altura:</Text>
            <Text style={styles.detailValue}>{pokemon.height / 10} m</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Habilidades:</Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((abilityInfo, index) => {
                const abilityName = abilityInfo.ability.name;
                const translatedName = (abilityTranslations as any)[abilityName] || capitalize(abilityName);
                return (
                  <Text key={index} style={styles.ability}>
                    {translatedName}
                    {abilityInfo.is_hidden ? " (Oculta)" : ""}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Estadísticas Base</Text>
          {pokemon.stats.map((statInfo, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{statInfo.stat.name.replace('-', ' ').toUpperCase()}</Text>
              <Text style={styles.statValue}>{statInfo.base_stat}</Text>
              <View style={styles.statBar}>
                <View
                  style={[styles.statBarFill, {
                    width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%`,
                    backgroundColor: statInfo.base_stat > 50 ? '#4CAF50' : '#F44336'
                  }]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorText: { fontSize: 16, color: '#E3350D', textAlign: 'center', marginBottom: 10 },
  retryText: { fontSize: 14, color: '#007AFF', textDecorationLine: 'underline' },
  header: { alignItems: 'center', padding: 20, backgroundColor: 'white', marginBottom: 10 },
  spritesContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
  spriteWrapper: { alignItems: 'center', justifyContent: 'center', margin: 10 },
  spriteLabel: { fontSize: 18, color: '#666', marginBottom: 5 },
  image: { width: 350, height: 350 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#333', marginTop: 10 },
  id: { fontSize: 18, color: '#666', marginTop: 5 },
  typesContainer: { flexDirection: 'row', marginTop: 10 },
  typeBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginHorizontal: 4 },
  typeText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  detailsCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, margin: 12, marginTop: 0 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  detailLabel: { fontWeight: 'bold', fontSize: 16, color: '#333', width: 100 },
  detailValue: { fontSize: 18, color: '#666', flex: 1 },
  abilitiesContainer: { flex: 1 },
  ability: { fontSize: 18, color: '#666', marginBottom: 4 },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statName: { fontSize: 18, color: '#666', width: 100 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#333', width: 40, textAlign: 'right', marginRight: 10 },
  statBar: { flex: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' },
  statBarFill: { height: '100%', borderRadius: 4 },
});
