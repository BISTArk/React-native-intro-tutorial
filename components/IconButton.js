import { View, Text, Pressable, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconButton = ({ icon, label, onPress }) => {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#000" />
            <Text style={styles.iconButoonLabel}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButoonLabel: {
        color: '#000',
        marginTop: 12,
    }
})

export default IconButton