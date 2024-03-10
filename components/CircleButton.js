import { View, Pressable, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CircleButton = ({onPress}) => {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name='add' size={38} color={"#fff"}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    circleButtonContainer:{width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: '#66b2b2',
        borderRadius: 42,
        padding: 3,},
    circleButton:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#000',
    }
})

export default CircleButton