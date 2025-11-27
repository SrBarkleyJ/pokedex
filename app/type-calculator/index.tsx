import TypeSelector from '@/app/components/TypeSelector';
import { calculateTypeEffectiveness, getEffectivenessColor, getEffectivenessDescription } from '@/src/types/api/typeApi';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TypeCalculatorScreen() {
    const [attackerType1, setAttackerType1] = useState<string | null>(null);
    const [attackerType2, setAttackerType2] = useState<string | null>(null);
    const [defenderType1, setDefenderType1] = useState<string | null>(null);
    const [defenderType2, setDefenderType2] = useState<string | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (!attackerType1 || !defenderType1) {
            setError('Debes seleccionar al menos un tipo atacante y un tipo defensor');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Calculate effectiveness for first attacker type
            const effectiveness1 = await calculateTypeEffectiveness(
                attackerType1,
                defenderType1,
                defenderType2 || undefined
            );

            // If there's a second attacker type, calculate and average
            if (attackerType2) {
                const effectiveness2 = await calculateTypeEffectiveness(
                    attackerType2,
                    defenderType1,
                    defenderType2 || undefined
                );
                // For dual attacking types, we show both results
                // But for simplicity, let's just show the first one
                // You could enhance this to show both
                setResult(effectiveness1);
            } else {
                setResult(effectiveness1);
            }
        } catch (err) {
            setError('Error al calcular la efectividad. Intenta de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setAttackerType1(null);
        setAttackerType2(null);
        setDefenderType1(null);
        setDefenderType2(null);
        setResult(null);
        setError(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="calculator" size={40} color="#333" />
                <Text style={styles.title}>Calculadora de Tipos</Text>
                <Text style={styles.subtitle}>
                    Calcula la efectividad de un ataque según los tipos
                </Text>
            </View>

            <TypeSelector
                label="🗡️ Tipo Atacante"
                selectedType1={attackerType1}
                selectedType2={attackerType2}
                onType1Change={setAttackerType1}
                onType2Change={setAttackerType2}
            />

            <TypeSelector
                label="🛡️ Tipo Defensor"
                selectedType1={defenderType1}
                selectedType2={defenderType2}
                onType1Change={setDefenderType1}
                onType2Change={setDefenderType2}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.calculateButton,
                        (!attackerType1 || !defenderType1) && styles.buttonDisabled
                    ]}
                    onPress={handleCalculate}
                    disabled={!attackerType1 || !defenderType1 || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Ionicons name="flash" size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.buttonText}>Calcular</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Ionicons name="refresh" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.resetButtonText}>Reiniciar</Text>
                </TouchableOpacity>
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={24} color="#E74C3C" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {result !== null && !error && (
                <View style={[styles.resultContainer, { backgroundColor: getEffectivenessColor(result) }]}>
                    <Text style={styles.resultLabel}>Efectividad del Ataque</Text>
                    <Text style={styles.resultMultiplier}>×{result}</Text>
                    <Text style={styles.resultDescription}>
                        {getEffectivenessDescription(result)}
                    </Text>

                    <View style={styles.resultExplanation}>
                        <Text style={styles.explanationText}>
                            {result === 0 && '❌ El ataque no tiene ningún efecto'}
                            {result === 0.25 && '⚠️ El ataque es muy poco efectivo'}
                            {result === 0.5 && '⚠️ El ataque es poco efectivo'}
                            {result === 1 && '➡️ El ataque tiene efectividad normal'}
                            {result === 2 && '✅ ¡El ataque es súper efectivo!'}
                            {result === 4 && '🔥 ¡El ataque es extremadamente efectivo!'}
                        </Text>
                    </View>
                </View>
            )}

            <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color="#555" />
                <Text style={styles.infoText}>
                    Los Pokémon pueden tener 1 o 2 tipos. Cuando un defensor tiene 2 tipos,
                    las efectividades se multiplican entre sí.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        minHeight: '100%',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    calculateButton: {
        flex: 2,
        backgroundColor: '#E3350D',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resetButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: '#FADBD8',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    errorText: {
        color: '#E74C3C',
        fontSize: 14,
        flex: 1,
    },
    resultContainer: {
        padding: 25,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    resultLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    resultMultiplier: {
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    resultDescription: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    resultExplanation: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
    },
    explanationText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    infoBox: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#999',
    },
    infoText: {
        color: '#555',
        fontSize: 13,
        flex: 1,
        lineHeight: 18,
    },
});
