import { StyleSheet, Image } from 'react-native'
import React from 'react'

const ImageViewer = ({ placeholderImg, selectedImage}) => {

    const imgSrc = selectedImage? {uri:selectedImage}:placeholderImg
    return (
        <Image source={imgSrc} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
})

export default ImageViewer