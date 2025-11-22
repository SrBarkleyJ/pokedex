import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const regions = [
    { name: 'Kanto', id: 'kanto' },
    { name: 'Johto', id: 'johto' },
    { name: 'Hoenn', id: 'hoenn' },
    { name: 'Sinnoh', id: 'sinnoh' },
    { name: 'Unova', id: 'unova' },
    { name: 'Kalos', id: 'kalos' },
    { name: 'Galar', id: 'galar' },
    { name: 'Paldea', id: 'paldea' },
];

export default function RegionsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: { name: string; id: string } }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/regions/${item.id}` as any)}
        >
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Regiones Pokémon</Text>
            <FlatList
                data={regions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
    list: { paddingBottom: 20 },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: { fontSize: 21, fontWeight: 'bold', color: '#333' },
});
