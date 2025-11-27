import { getPokemonById, getPokemonsByGeneration } from '@/src/types/api/pokeapi';
import { Pokemon } from '@/src/types/pokemon';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

export default function GuessPokemonScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [selectedGeneration, setSelectedGeneration] = useState<number>(1);
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [revealed, setRevealed] = useState<boolean>(false);
    const [answered, setAnswered] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [allPokemon, setAllPokemon] = useState<any[]>([]);
    const [volume, setVolume] = useState<number>(0.5); // Volume from 0 to 1

    useEffect(() => {
        loadGeneration();
    }, [selectedGeneration]);

    useEffect(() => {
        if (allPokemon.length > 0) {
            loadRandomPokemon();
        }
    }, [allPokemon]);

    const loadGeneration = async () => {
        try {
            setLoading(true);
            const pokemonList = await getPokemonsByGeneration(selectedGeneration);
            setAllPokemon(pokemonList);
        } catch (error) {
            console.error('Error loading generation:', error);
        }
    };

    const loadRandomPokemon = async () => {
        if (allPokemon.length === 0) return;

        try {
            setLoading(true);
            setRevealed(false);
            setAnswered(false);
            setSelectedAnswer(null);

            // Pick random Pokémon
            const randomIndex = Math.floor(Math.random() * allPokemon.length);
            const selected = allPokemon[randomIndex];

            // Get Pokémon ID from URL
            const pokemonId = selected.url.split('/').slice(-2, -1)[0];

            // Fetch full Pokémon data
            const pokemonData = await getPokemonById(pokemonId);
            setCurrentPokemon(pokemonData);

            // Generate options
            generateOptions(pokemonData.name);

            setLoading(false);
        } catch (error) {
            console.error('Error loading random Pokémon:', error);
            setLoading(false);
        }
    };

    const generateOptions = (correctName: string) => {
        const optionsList = [correctName];

        // Get 3 random wrong answers
        while (optionsList.length < 4) {
            const randomPokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)];
            const pokemonName = randomPokemon.name;

            if (!optionsList.includes(pokemonName)) {
                optionsList.push(pokemonName);
            }
        }

        // Shuffle options
        const shuffled = optionsList.sort(() => Math.random() - 0.5);
        setOptions(shuffled);
    };

    const handleAnswer = async (selectedName: string) => {
        if (answered) return;

        setAnswered(true);
        setSelectedAnswer(selectedName);

        const correct = selectedName === currentPokemon?.name;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
            setStreak(streak + 1);

            // Haptic feedback
            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }

            // Play Pokémon cry
            if (currentPokemon) {
                playPokemonCry(currentPokemon.id);
            }
        } else {
            setStreak(0);

            // Haptic feedback
            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        }

        // Reveal Pokémon
        setRevealed(true);

        // Next round after 2.5 seconds
        setTimeout(() => {
            loadRandomPokemon();
        }, 2500);
    };

    const playPokemonCry = async (pokemonId: number) => {
        try {
            const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
            const { sound } = await Audio.Sound.createAsync({ uri: cryUrl });

            // Set volume before playing
            await sound.setVolumeAsync(volume);
            await sound.playAsync();

            // Unload sound after playing
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.log('Error playing cry:', error);
        }
    };

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const resetGame = () => {
        setScore(0);
        setStreak(0);
        loadRandomPokemon();
    };

    const getButtonStyle = (optionName: string) => {
        if (!answered) return styles.optionButton;

        if (optionName === currentPokemon?.name) {
            return [styles.optionButton, styles.correctButton];
        }

        if (optionName === selectedAnswer && !isCorrect) {
            return [styles.optionButton, styles.wrongButton];
        }

        return [styles.optionButton, styles.disabledButton];
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header with Generation Selector */}
                <View style={styles.header}>
                    <Text style={styles.title}>¿Quién es ese Pokémon?</Text>

                    <View style={styles.generationSelector}>
                        <Text style={styles.generationLabel}>Generación:</Text>
                        <View style={styles.generationButtons}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
                                <TouchableOpacity
                                    key={gen}
                                    style={[
                                        styles.genButton,
                                        selectedGeneration === gen && styles.genButtonActive
                                    ]}
                                    onPress={() => setSelectedGeneration(gen)}
                                >
                                    <Text
                                        style={[
                                            styles.genButtonText,
                                            selectedGeneration === gen && styles.genButtonTextActive
                                        ]}
                                    >
                                        {gen}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Volume Control */}
                <View style={styles.volumeContainer}>
                    <Ionicons name={volume === 0 ? "volume-mute" : volume < 0.5 ? "volume-low" : "volume-high"} size={24} color="#666" />
                    <Slider
                        style={styles.volumeSlider}
                        minimumValue={0}
                        maximumValue={1}
                        value={volume}
                        onValueChange={setVolume}
                        minimumTrackTintColor="#E3350D"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#E3350D"
                    />
                    <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
                </View>

                {/* Score Display */}
                <View style={styles.scoreContainer}>
                    <View style={styles.scoreBox}>
                        <Ionicons name="trophy" size={24} color="#FFD700" />
                        <Text style={styles.scoreText}>Puntos: {score}</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Ionicons name="flame" size={24} color="#FF6B6B" />
                        <Text style={styles.scoreText}>Racha: {streak}</Text>
                    </View>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#E3350D" />
                        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
                    </View>
                ) : currentPokemon ? (
                    <>
                        {/* Pokémon Image (Silhouette or Revealed) */}
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: currentPokemon.sprites.other['official-artwork'].front_default
                                }}
                                style={[
                                    styles.pokemonImage,
                                    !revealed && styles.silhouette
                                ]}
                                resizeMode="contain"
                            />
                            {revealed && (
                                <Text style={styles.pokemonName}>
                                    {capitalize(currentPokemon.name)}
                                </Text>
                            )}
                        </View>

                        {/* Feedback Message */}
                        {answered && (
                            <View style={styles.feedbackContainer}>
                                {isCorrect ? (
                                    <View style={styles.correctFeedback}>
                                        <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
                                        <Text style={styles.correctText}>¡Correcto! 🎉</Text>
                                    </View>
                                ) : (
                                    <View style={styles.wrongFeedback}>
                                        <Ionicons name="close-circle" size={32} color="#F44336" />
                                        <Text style={styles.wrongText}>
                                            ¡Incorrecto! Era {capitalize(currentPokemon.name)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}

                        {/* Options */}
                        <View style={[styles.optionsContainer, isMobile && styles.optionsContainerMobile]}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={getButtonStyle(option)}
                                    onPress={() => handleAnswer(option)}
                                    disabled={answered}
                                >
                                    <Text style={styles.optionText}>{capitalize(option)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ) : null}

                {/* Reset Button */}
                <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                    <Ionicons name="refresh" size={20} color="#fff" />
                    <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E3350D',
        textAlign: 'center',
        marginBottom: 15
    },
    generationSelector: {
        alignItems: 'center'
    },
    generationLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10
    },
    generationButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8
    },
    genButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ddd'
    },
    genButtonActive: {
        backgroundColor: '#E3350D',
        borderColor: '#E3350D'
    },
    genButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666'
    },
    genButtonTextActive: {
        color: '#fff'
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
        width: '100%'
    },
    scoreBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: {
                elevation: 3
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }
        })
    },
    scoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    volumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 20,
        width: '100%',
        maxWidth: 400,
        gap: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: {
                elevation: 3
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }
        })
    },
    volumeSlider: {
        flex: 1,
        height: 40
    },
    volumeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        minWidth: 45,
        textAlign: 'right'
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 30,
        width: '100%'
    },
    pokemonImage: {
        width: 300,
        height: 300,
        maxWidth: '90%'
    },
    silhouette: {
        tintColor: '#000'
    },
    pokemonName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E3350D',
        marginTop: 10
    },
    feedbackContainer: {
        marginBottom: 20
    },
    correctFeedback: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12
    },
    correctText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50'
    },
    wrongFeedback: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12
    },
    wrongText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F44336',
        flexShrink: 1
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
        width: '100%',
        maxWidth: 600,
        marginBottom: 30
    },
    optionsContainerMobile: {
        maxWidth: '100%'
    },
    optionButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        minWidth: 140,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: {
                elevation: 3
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }
        })
    },
    correctButton: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50'
    },
    wrongButton: {
        backgroundColor: '#F44336',
        borderColor: '#F44336'
    },
    disabledButton: {
        opacity: 0.5
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#E3350D',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4
            },
            android: {
                elevation: 4
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
            }
        })
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
});
