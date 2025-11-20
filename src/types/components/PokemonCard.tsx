import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { PokemonCardProps } from '../pokemon';

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const getIdFromUrl = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const pokemonId: string = getIdFromUrl(pokemon.url);
  const imageUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.id}>#{pokemonId.toString().padStart(3, '0')}</Text>
      <Text style={styles.name}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    minHeight: 350,
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }
    }),
  },
  image: {
    width: '80%',
    height: '80%',
  },
  name: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    textAlign: 'center'
  },
  id: {
    fontSize: 18,
    color: "#666",
    marginTop: 4
  }
});

export default PokemonCard;