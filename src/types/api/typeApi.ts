import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface TypeRelations {
    no_damage_to: Array<{ name: string; url: string }>;
    half_damage_to: Array<{ name: string; url: string }>;
    double_damage_to: Array<{ name: string; url: string }>;
    no_damage_from: Array<{ name: string; url: string }>;
    half_damage_from: Array<{ name: string; url: string }>;
    double_damage_from: Array<{ name: string; url: string }>;
}

export interface TypeData {
    id: number;
    name: string;
    damage_relations: TypeRelations;
}

// Fetch type data from PokeAPI
export const getTypeData = async (typeName: string): Promise<TypeData> => {
    const response = await axios.get(`${BASE_URL}/type/${typeName}`);
    return response.data;
};

// Calculate effectiveness multiplier for a single attacking type vs single defending type
export const calculateSingleTypeEffectiveness = (
    attackerData: TypeData,
    defenderTypeName: string
): number => {
    const { damage_relations } = attackerData;

    // Check if attacker does 2x damage to defender
    if (damage_relations.double_damage_to.some(t => t.name === defenderTypeName)) {
        return 2;
    }

    // Check if attacker does 0.5x damage to defender
    if (damage_relations.half_damage_to.some(t => t.name === defenderTypeName)) {
        return 0.5;
    }

    // Check if attacker does 0x damage to defender (immunity)
    if (damage_relations.no_damage_to.some(t => t.name === defenderTypeName)) {
        return 0;
    }

    // Normal effectiveness
    return 1;
};

// Calculate effectiveness for dual-type defender
export const calculateTypeEffectiveness = async (
    attackerType: string,
    defenderType1: string,
    defenderType2?: string
): Promise<number> => {
    // Fetch attacker type data
    const attackerData = await getTypeData(attackerType);

    // Calculate effectiveness against first defender type
    const multiplier1 = calculateSingleTypeEffectiveness(attackerData, defenderType1);

    // If defender has only one type, return the multiplier
    if (!defenderType2) {
        return multiplier1;
    }

    // Calculate effectiveness against second defender type
    const multiplier2 = calculateSingleTypeEffectiveness(attackerData, defenderType2);

    // Multiply the two multipliers together
    // Possible results: 4x, 2x, 1x, 0.5x, 0.25x, 0x
    return multiplier1 * multiplier2;
};

// Get effectiveness description
export const getEffectivenessDescription = (multiplier: number): string => {
    if (multiplier === 0) return 'Sin efecto';
    if (multiplier === 0.25) return 'Muy poco efectivo';
    if (multiplier === 0.5) return 'Poco efectivo';
    if (multiplier === 1) return 'Efectividad normal';
    if (multiplier === 2) return 'Súper efectivo';
    if (multiplier === 4) return 'Extremadamente efectivo';
    return 'Efectividad normal';
};

// Get color for effectiveness
export const getEffectivenessColor = (multiplier: number): string => {
    if (multiplier === 0) return '#999';
    if (multiplier < 1) return '#E74C3C'; // Red for not effective
    if (multiplier === 1) return '#95A5A6'; // Gray for normal
    if (multiplier >= 2) return '#27AE60'; // Green for super effective
    return '#95A5A6';
};
