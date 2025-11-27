import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GenerationNavbarProps {
    selectedGeneration: number | null;
    onSelectGeneration: (gen: number) => void;
}

const generations = Array.from({ length: 9 }, (_, i) => i + 1);

const GenerationNavbar: React.FC<GenerationNavbarProps> = ({ selectedGeneration, onSelectGeneration }) => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={generations}
                keyExtractor={(item) => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedGeneration === item && styles.selectedButton
                        ]}
                        onPress={() => onSelectGeneration(item)}
                    >
                        <Text
                            style={[
                                styles.text,
                                selectedGeneration === item && styles.selectedText
                            ]}
                        >
                            Gen {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContent: {
        paddingHorizontal: 10,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    selectedButton: {
        backgroundColor: '#E3350D',
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    selectedText: {
        color: '#fff',
    },
});

export default GenerationNavbar;
