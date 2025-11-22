import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const regionData: { [key: string]: { name: string; badges: string[]; bulbapedia: string } } = {
    kanto: {
        name: 'Kanto',
        badges: ['Boulder', 'Cascade', 'Thunder', 'Rainbow', 'Soul', 'Marsh', 'Volcano', 'Earth'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Kanto_League',
    },
    johto: {
        name: 'Johto',
        badges: ['Zephyr', 'Hive', 'Plain', 'Fog', 'Storm', 'Mineral', 'Glacier', 'Rising'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Johto_League',
    },
    hoenn: {
        name: 'Hoenn',
        badges: ['Stone', 'Knuckle', 'Dynamo', 'Heat', 'Balance', 'Feather', 'Mind', 'Rain'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Hoenn_League',
    },
    sinnoh: {
        name: 'Sinnoh',
        badges: ['Coal', 'Forest', 'Cobble', 'Fen', 'Relic', 'Mine', 'Icicle', 'Beacon'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Sinnoh_League',
    },
    unova: {
        name: 'Unova',
        badges: ['Trio', 'Basic', 'Insect', 'Bolt', 'Quake', 'Jet', 'Freeze', 'Legend'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Unova_League',
    },
    kalos: {
        name: 'Kalos',
        badges: ['Bug', 'Cliff', 'Rumble', 'Plant', 'Voltage', 'Fairy', 'Psychic', 'Iceberg'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Kalos_League',
    },
    galar: {
        name: 'Galar',
        badges: ['Grass', 'Water', 'Fire', 'Fighting', 'Ghost', 'Fairy', 'Rock', 'Ice', 'Dark', 'Drake'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Galar_League',
    },
    paldea: {
        name: 'Paldea',
        badges: ['Bug', 'Grass', 'Electric', 'Water', 'Normal', 'Ghost', 'Psychic', 'Ice'],
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Badge#Paldea_League',
    },
};

// Import local assets
const kantoMap = require('../../src/assets/images/maps/kanto.png');
const johtoMap = require('../../src/assets/images/maps/johto.png');
const hoennMap = require('../../src/assets/images/maps/hoenn.png');
const sinnohMap = require('../../src/assets/images/maps/sinnoh.png');
const unovaMap = require('../../src/assets/images/maps/unova.png');
const kalosMap = require('../../src/assets/images/maps/kalos.png');
const galarMap = require('../../src/assets/images/maps/galar.png');
const paldeaMap = require('../../src/assets/images/maps/paldea.png');

// Badge mapping by region - Using WikiDex CDN for Kanto-Unova, local files for Kalos-Paldea
const badgesByRegion: { [region: string]: { [badge: string]: string | any } } = {
    kanto: {
        Boulder: 'https://images.wikidexcdn.net/mwuploads/wikidex/3/39/Medalla_Roca.png',
        Cascade: 'https://images.wikidexcdn.net/mwuploads/wikidex/6/60/Medalla_Cascada.png',
        Thunder: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e6/Medalla_Trueno.png',
        Rainbow: 'https://images.wikidexcdn.net/mwuploads/wikidex/0/09/Medalla_Arco%C3%ADris.png',
        Soul: 'https://images.wikidexcdn.net/mwuploads/wikidex/c/c5/Medalla_Alma.png',
        Marsh: 'https://images.wikidexcdn.net/mwuploads/wikidex/c/c2/Medalla_Pantano.png',
        Volcano: 'https://images.wikidexcdn.net/mwuploads/wikidex/9/93/Medalla_Volc%C3%A1n.png',
        Earth: 'https://images.wikidexcdn.net/mwuploads/wikidex/1/16/Medalla_Tierra.png',
    },
    johto: {
        Zephyr: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/ee/Medalla_C%C3%A9firo.png',
        Hive: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/ee/Medalla_Colmena.png',
        Plain: 'https://images.wikidexcdn.net/mwuploads/wikidex/8/8d/Medalla_Planicie.png',
        Fog: 'https://images.wikidexcdn.net/mwuploads/wikidex/c/c2/Medalla_Niebla.png',
        Storm: 'https://images.wikidexcdn.net/mwuploads/wikidex/2/2d/Medalla_Tormenta.png',
        Mineral: 'https://images.wikidexcdn.net/mwuploads/wikidex/6/6a/Medalla_Mineral.png',
        Glacier: 'https://images.wikidexcdn.net/mwuploads/wikidex/f/f8/Medalla_Glaciar.png',
        Rising: require('../../src/assets/images/badges/jhoto_dragon.png'),
    },
    hoenn: {
        Stone: 'https://images.wikidexcdn.net/mwuploads/wikidex/f/ff/Medalla_Piedra.png',
        Knuckle: 'https://images.wikidexcdn.net/mwuploads/wikidex/8/85/Medalla_Pu%C3%B1o.png',
        Dynamo: 'https://images.wikidexcdn.net/mwuploads/wikidex/1/18/Medalla_Dinamo.png',
        Heat: 'https://images.wikidexcdn.net/mwuploads/wikidex/5/5c/Medalla_Calor.png',
        Balance: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e7/Medalla_Equilibrio.png',
        Feather: 'https://images.wikidexcdn.net/mwuploads/wikidex/b/b3/Medalla_Pluma.png',
        Mind: 'https://images.wikidexcdn.net/mwuploads/wikidex/a/a0/Medalla_Mente.png',
        Rain: 'https://images.wikidexcdn.net/mwuploads/wikidex/4/47/Medalla_Lluvia.png',
    },
    sinnoh: {
        Coal: 'https://images.wikidexcdn.net/mwuploads/wikidex/0/0b/Medalla_Lignito.png',
        Forest: 'https://images.wikidexcdn.net/mwuploads/wikidex/7/75/Medalla_Bosque.png',
        Cobble: 'https://images.wikidexcdn.net/mwuploads/wikidex/a/a5/Medalla_Adoqu%C3%ADn.png',
        Fen: 'https://images.wikidexcdn.net/mwuploads/wikidex/7/73/Medalla_Ci%C3%A9naga.png',
        Relic: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e2/Medalla_Reliquia.png',
        Mine: 'https://images.wikidexcdn.net/mwuploads/wikidex/7/7c/Medalla_Mina.png',
        Icicle: 'https://images.wikidexcdn.net/mwuploads/wikidex/0/06/Medalla_Car%C3%A1mbano.png',
        Beacon: 'https://images.wikidexcdn.net/mwuploads/wikidex/7/7b/Medalla_Faro.png',
    },
    unova: {
        Trio: 'https://images.wikidexcdn.net/mwuploads/wikidex/3/31/Medalla_Tr%C3%ADo.png',
        Basic: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e8/Medalla_Base.png',
        Insect: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e2/Medalla_%C3%89litro.png',
        Bolt: 'https://images.wikidexcdn.net/mwuploads/wikidex/9/93/Medalla_Voltio.png',
        Quake: 'https://images.wikidexcdn.net/mwuploads/wikidex/c/c3/Medalla_Temblor.png',
        Jet: 'https://images.wikidexcdn.net/mwuploads/wikidex/8/80/Medalla_Jet.png',
        Freeze: 'https://images.wikidexcdn.net/mwuploads/wikidex/2/2c/Medalla_Candelizo.png',
        Legend: 'https://images.wikidexcdn.net/mwuploads/wikidex/f/f3/Medalla_Leyenda.png',
    },
    kalos: {
        Bug: require('../../src/assets/images/badges/kalos_bug.png'),
        Cliff: require('../../src/assets/images/badges/kalos_cliff.png'),
        Rumble: require('../../src/assets/images/badges/kalos_lit.png'),
        Plant: require('../../src/assets/images/badges/kalos_plant.png'),
        Voltage: require('../../src/assets/images/badges/kalos_voltage.png'),
        Fairy: require('../../src/assets/images/badges/kalos_fairy.png'),
        Psychic: require('../../src/assets/images/badges/kalos_psychic.png'),
        Iceberg: require('../../src/assets/images/badges/kalos_iceberg.png'),
    },
    galar: {
        Grass: require('../../src/assets/images/badges/galar_grass.png'),
        Water: require('../../src/assets/images/badges/galar_water.png'),
        Fire: require('../../src/assets/images/badges/galar_fire.png'),
        Fighting: require('../../src/assets/images/badges/galar_fighting.png'),
        Ghost: require('../../src/assets/images/badges/galar_ghost.png'),
        Fairy: require('../../src/assets/images/badges/galar_fairy.png'),
        Rock: require('../../src/assets/images/badges/galar_rock.png'),
        Ice: require('../../src/assets/images/badges/galar_ice.png'),
        Dark: require('../../src/assets/images/badges/galar_dark.png'),
        Drake: require('../../src/assets/images/badges/galar_drake.png'),
    },
    paldea: {
        Bug: require('../../src/assets/images/badges/paldea_bug.png'),
        Grass: require('../../src/assets/images/badges/paldea_grass.png'),
        Electric: require('../../src/assets/images/badges/paldea_electric.png'),
        Water: require('../../src/assets/images/badges/paldea_water.png'),
        Normal: require('../../src/assets/images/badges/paldea_normal.png'),
        Ghost: require('../../src/assets/images/badges/paldea_ghost.png'),
        Psychic: require('../../src/assets/images/badges/paldea_psychic.png'),
        Ice: require('../../src/assets/images/badges/paldea_ice.png'),
    },
};

export default function RegionDetailScreen() {
    const { name } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const regionId = Array.isArray(name) ? name[0] : name;
    const region = regionData[regionId?.toLowerCase() || ''];

    useEffect(() => {
        navigation.setOptions({
            title: region ? region.name : 'Región',
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 3, marginRight: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [region, navigation]);

    if (!region) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Región no encontrada</Text>
            </View>
        );
    }

    const getMapImage = (id: string) => {
        switch (id.toLowerCase()) {
            case 'kanto': return kantoMap;
            case 'johto': return johtoMap;
            case 'hoenn': return hoennMap;
            case 'sinnoh': return sinnohMap;
            case 'unova': return unovaMap;
            case 'kalos': return kalosMap;
            case 'galar': return galarMap;
            case 'paldea': return paldeaMap;
            default: return null;
        }
    };

    const mapImage = getMapImage(regionId || '');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{region.name}</Text>

            <View style={isDesktop ? styles.mapContainerDesktop : styles.mapContainerMobile}>
                {mapImage ? (
                    <Image source={mapImage} style={styles.mapImage} resizeMode="contain" />
                ) : (
                    <View style={styles.placeholderMap}>
                        <Text style={styles.placeholderText}>Mapa de {region.name}</Text>
                        <Text style={styles.subText}>(Imagen no disponible)</Text>
                    </View>
                )}
            </View>

            <Text style={styles.sectionTitle}>Medallas de Gimnasio</Text>

            {isDesktop ? (
                <View style={styles.badgesGridDesktop}>
                    {region.badges.map((badge, index) => {
                        const badgeKey = badge.split('/')[0];
                        const regionBadges = badgesByRegion[regionId?.toLowerCase() || ''] || {};
                        const badgeImage = regionBadges[badgeKey] || regionBadges[badge];

                        return (
                            <View key={index} style={styles.badgeCardDesktop}>
                                <View style={styles.badgePlaceholder}>
                                    {badgeImage ? (
                                        <Image
                                            source={typeof badgeImage === 'string' ? { uri: badgeImage } : badgeImage}
                                            style={styles.badgeImage}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Ionicons name="trophy" size={40} color="#ccc" />
                                    )}
                                </View>
                                <Text style={styles.badgeName}>{badge}</Text>
                            </View>
                        );
                    })}
                </View>
            ) : (
                <View style={styles.badgesColumnMobile}>
                    {region.badges.map((badge, index) => {
                        const badgeKey = badge.split('/')[0];
                        const regionBadges = badgesByRegion[regionId?.toLowerCase() || ''] || {};
                        const badgeImage = regionBadges[badgeKey] || regionBadges[badge];

                        return (
                            <View key={index} style={styles.badgeCardMobile}>
                                <View style={styles.badgePlaceholder}>
                                    {badgeImage ? (
                                        <Image
                                            source={typeof badgeImage === 'string' ? { uri: badgeImage } : badgeImage}
                                            style={styles.badgeImage}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Ionicons name="trophy" size={60} color="#ccc" />
                                    )}
                                </View>
                                <Text style={styles.badgeName}>{badge}</Text>
                            </View>
                        );
                    })}
                </View>
            )}

            <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(region.bulbapedia)}>
                <Ionicons name="link" size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.linkText}>Ver más en Bulbapedia</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f5f5f5', minHeight: '100%', alignItems: 'center' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },

    // Map Containers
    mapContainerDesktop: {
        width: '75%',
        maxWidth: 600,
        marginBottom: 30,
    },
    mapContainerMobile: {
        width: '100%',
        marginBottom: 30,
    },

    placeholderMap: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    placeholderText: { fontSize: 18, fontWeight: 'bold', color: '#666' },
    subText: { fontSize: 14, color: '#888', marginTop: 5 },
    sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15, width: '100%', textAlign: 'center' },

    // Desktop Badge Grid (2 rows x 4 columns)
    badgesGridDesktop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 800,
    },

    // Desktop Card
    badgeCardDesktop: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '20%',
        minWidth: 150,
    },

    // Mobile Column
    badgesColumnMobile: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    // Mobile Card
    badgeCardMobile: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '90%',
        marginBottom: 15,
    },

    badgePlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#f0f0f0',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    badgeName: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center' },
    errorText: { fontSize: 18, color: 'red' },
    linkButton: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        maxWidth: 400,
    },
    linkText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    mapImage: { width: '100%', height: 400, borderRadius: 12 },
    badgeImage: { width: 100, height: 100 },
});
