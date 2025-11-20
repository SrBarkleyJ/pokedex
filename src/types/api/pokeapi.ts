import axios from 'axios';
import { GenerationResponse, Pokemon, PokemonListItem, PokemonListResponse } from '../pokemon';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const getPokemons = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  try {
    console.log(`Fetching pokémons: limit=${limit}, offset=${offset}`);
    const response = await pokeApi.get<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pokémons:', error);
    throw new Error('No se pudieron cargar los pokémons. Verifica tu conexión.');
  }
};

export const getPokemonsByGeneration = async (id: number): Promise<PokemonListItem[]> => {
  try {
    console.log(`Fetching pokémons for generation ${id}`);
    const response = await pokeApi.get<GenerationResponse>(`generation/${id}`);
    return response.data.pokemon_species;
  } catch (error) {
    console.error(`Error fetching generation ${id}:`, error);
    throw new Error(`No se pudieron cargar los pokémons de la generación ${id}`);
  }
};

export const getPokemonById = async (id: string | number): Promise<Pokemon> => {
  try {
    console.log(`Fetching pokémon with ID: ${id}`);
    const response = await pokeApi.get<Pokemon>(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokémon with ID ${id}:`, error);
    throw new Error(`No se pudo cargar el pokémon con ID ${id}`);
  }
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    console.log(`Fetching pokémon with name: ${name}`);
    const response = await pokeApi.get<Pokemon>(`pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokémon with name ${name}:`, error);
    throw new Error(`No se pudo encontrar el pokémon "${name}"`);
  }
};

// Interceptor para manejar respuestas
pokeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          throw new Error('Pokémon no encontrado');
        case 500:
          throw new Error('Error del servidor de PokeAPI');
        default:
          throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
      }
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
      throw new Error('Error al realizar la petición');
    }
  }
);

export default pokeApi;