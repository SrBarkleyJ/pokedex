// Pokémon type data with colors for UI
export const POKEMON_TYPES = [
    { id: 1, name: 'normal', displayName: 'Normal', color: '#A8A878' },
    { id: 2, name: 'fighting', displayName: 'Lucha', color: '#C03028' },
    { id: 3, name: 'flying', displayName: 'Volador', color: '#A890F0' },
    { id: 4, name: 'poison', displayName: 'Veneno', color: '#A040A0' },
    { id: 5, name: 'ground', displayName: 'Tierra', color: '#E0C068' },
    { id: 6, name: 'rock', displayName: 'Roca', color: '#B8A038' },
    { id: 7, name: 'bug', displayName: 'Bicho', color: '#A8B820' },
    { id: 8, name: 'ghost', displayName: 'Fantasma', color: '#705898' },
    { id: 9, name: 'steel', displayName: 'Acero', color: '#B8B8D0' },
    { id: 10, name: 'fire', displayName: 'Fuego', color: '#F08030' },
    { id: 11, name: 'water', displayName: 'Agua', color: '#6890F0' },
    { id: 12, name: 'grass', displayName: 'Planta', color: '#78C850' },
    { id: 13, name: 'electric', displayName: 'Eléctrico', color: '#F8D030' },
    { id: 14, name: 'psychic', displayName: 'Psíquico', color: '#F85888' },
    { id: 15, name: 'ice', displayName: 'Hielo', color: '#98D8D8' },
    { id: 16, name: 'dragon', displayName: 'Dragón', color: '#7038F8' },
    { id: 17, name: 'dark', displayName: 'Siniestro', color: '#705848' },
    { id: 18, name: 'fairy', displayName: 'Hada', color: '#EE99AC' },
];

export type PokemonType = typeof POKEMON_TYPES[number];

export const getTypeByName = (name: string): PokemonType | undefined => {
    return POKEMON_TYPES.find(type => type.name === name);
};

export const getTypeColor = (typeName: string): string => {
    const type = getTypeByName(typeName);
    return type?.color || '#777';
};
