import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

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
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Regiones Pokémon</Text>

            {isDesktop ? (
                <View style={styles.gridDesktop}>
                    {regions.map((region) => (
                        <TouchableOpacity
                            key={region.id}
                            style={styles.cardDesktop}
                            onPress={() => router.push(`/regions/${region.id}` as any)}
                        >
                            <Text style={styles.cardText}>{region.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <View style={styles.columnMobile}>
                    {regions.map((region) => (
                        <TouchableOpacity
                            key={region.id}
                            style={styles.cardMobile}
                            onPress={() => router.push(`/regions/${region.id}` as any)}
                        >
                            <Text style={styles.cardText}>{region.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        minHeight: '100%',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center'
    },

    // Desktop Grid (2 rows x 4 columns)
    gridDesktop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 900,
    },

    // Desktop Card
    cardDesktop: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 12,
        marginBottom: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '20%',
        minWidth: 180,
        minHeight: 100,
    },

    // Mobile Column
    columnMobile: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    // Mobile Card
    cardMobile: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '90%',
        marginBottom: 15,
        minHeight: 80,
    },

    cardText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#333'
    },
});
