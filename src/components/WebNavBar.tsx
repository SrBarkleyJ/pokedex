import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WebNavBar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { label: 'Pokédex', icon: 'list', path: '/' },
        { label: 'Regiones', icon: 'map', path: '/regions' },
        { label: 'Tipos', icon: 'calculator', path: '/type-calculator' },
    ];

    return (
        <View style={styles.container}>
            {navItems.map((item) => {
                const isActive = pathname === item.path ||
                    (item.path === '/regions' && pathname.startsWith('/regions')) ||
                    (item.path === '/type-calculator' && pathname.startsWith('/type-calculator'));

                return (
                    <TouchableOpacity
                        key={item.path}
                        style={[styles.navItem, isActive && styles.navItemActive]}
                        onPress={() => router.push(item.path as any)}
                    >
                        <Ionicons
                            name={item.icon as any}
                            size={20}
                            color={isActive ? '#E3350D' : '#fff'}
                        />
                        <Text style={[styles.navText, isActive && styles.navTextActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginRight: 15,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    navItemActive: {
        backgroundColor: '#fff',
    },
    navText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    navTextActive: {
        color: '#E3350D',
    },
});
