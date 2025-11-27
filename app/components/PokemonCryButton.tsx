import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface PokemonCryButtonProps {
    pokemonId: number;
    pokemonName: string;
}

export function PokemonCryButton({ pokemonId, pokemonName }: PokemonCryButtonProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const playSound = async () => {
        try {
            setIsLoading(true);

            // URL del sonido desde PokeAPI
            const soundUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;

            // Configurar el modo de audio
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
            });

            // Crear y cargar el sonido
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: soundUrl },
                { shouldPlay: true }
            );

            setSound(newSound);
            setIsPlaying(true);

            // Listener para cuando termine de reproducirse
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });

        } catch (error) {
            console.error('Error al reproducir el sonido:', error);
            setIsPlaying(false);
            // Silenciosamente falla si el sonido no está disponible
        } finally {
            setIsLoading(false);
        }
    };

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
        }
    };

    // Limpiar el sonido cuando el componente se desmonte
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <TouchableOpacity
            onPress={isPlaying ? stopSound : playSound}
            disabled={isLoading}
            style={[
                styles.button,
                { backgroundColor: isPlaying ? '#ef4444' : '#3b82f6' }
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color="white" size="small" />
            ) : (
                <Ionicons
                    name={isPlaying ? 'stop' : 'volume-high'}
                    size={24}
                    color="white"
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
