import { POKEMON_TYPES } from '@/src/data/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TypeSelectorProps {
    label: string;
    selectedType1: string | null;
    selectedType2: string | null;
    onType1Change: (type: string | null) => void;
    onType2Change: (type: string | null) => void;
}

export default function TypeSelector({
    label,
    selectedType1,
    selectedType2,
    onType1Change,
    onType2Change,
}: TypeSelectorProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectingSlot, setSelectingSlot] = useState<1 | 2>(1);

    const handleTypeSelect = (typeName: string) => {
        if (selectingSlot === 1) {
            if (selectedType1 === typeName) {
                onType1Change(null);
            } else {
                onType1Change(typeName);
            }
        } else {
            if (selectedType2 === typeName) {
                onType2Change(null);
            } else {
                onType2Change(typeName);
            }
        }
        setIsExpanded(false);
    };

    const handleSlotPress = (slot: 1 | 2) => {
        setSelectingSlot(slot);
        setIsExpanded(true);
    };

    const handleClearType2 = () => {
        onType2Change(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {/* Selected Types Display */}
            <View style={styles.selectedContainer}>
                <TouchableOpacity
                    style={[
                        styles.typeSlot,
                        selectedType1 && { backgroundColor: POKEMON_TYPES.find(t => t.name === selectedType1)?.color }
                    ]}
                    onPress={() => handleSlotPress(1)}
                >
                    {selectedType1 ? (
                        <Text style={styles.typeSlotText}>
                            {POKEMON_TYPES.find(t => t.name === selectedType1)?.displayName}
                        </Text>
                    ) : (
                        <View style={styles.emptySlot}>
                            <Ionicons name="add-circle-outline" size={24} color="#999" />
                            <Text style={styles.emptySlotText}>Tipo 1</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeSlot,
                        selectedType2 && { backgroundColor: POKEMON_TYPES.find(t => t.name === selectedType2)?.color }
                    ]}
                    onPress={() => handleSlotPress(2)}
                    disabled={!selectedType1}
                >
                    {selectedType2 ? (
                        <View style={styles.typeSlotWithClear}>
                            <Text style={styles.typeSlotText}>
                                {POKEMON_TYPES.find(t => t.name === selectedType2)?.displayName}
                            </Text>
                            <TouchableOpacity onPress={handleClearType2} style={styles.clearButton}>
                                <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.8)" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.emptySlot, !selectedType1 && styles.emptySlotDisabled]}>
                            <Ionicons name="add-circle-outline" size={24} color={selectedType1 ? "#999" : "#ddd"} />
                            <Text style={[styles.emptySlotText, !selectedType1 && styles.emptySlotTextDisabled]}>
                                Tipo 2 (opcional)
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Collapsible Type Grid */}
            {isExpanded && (
                <View style={styles.typeGrid}>
                    <View style={styles.gridHeader}>
                        <Text style={styles.gridTitle}>
                            Selecciona {selectingSlot === 1 ? 'Tipo 1' : 'Tipo 2'}
                        </Text>
                        <TouchableOpacity onPress={() => setIsExpanded(false)}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.gridScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.gridContent}>
                            {POKEMON_TYPES
                                .filter(type => selectingSlot === 2 ? type.name !== selectedType1 : true)
                                .map((type) => (
                                    <TouchableOpacity
                                        key={type.id}
                                        style={[
                                            styles.typeBadge,
                                            { backgroundColor: type.color }
                                        ]}
                                        onPress={() => handleTypeSelect(type.name)}
                                    >
                                        <Text style={styles.typeBadgeText}>{type.displayName}</Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    selectedContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    typeSlot: {
        flex: 1,
        minHeight: 80,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#ddd',
    },
    typeSlotText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    typeSlotWithClear: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    clearButton: {
        padding: 2,
    },
    emptySlot: {
        alignItems: 'center',
        gap: 5,
    },
    emptySlotDisabled: {
        opacity: 0.4,
    },
    emptySlotText: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
    },
    emptySlotTextDisabled: {
        color: '#ddd',
    },
    typeGrid: {
        marginTop: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 15,
        maxHeight: 300,
    },
    gridHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    gridTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    gridScroll: {
        maxHeight: 250,
    },
    gridContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    typeBadge: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        minWidth: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    typeBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
