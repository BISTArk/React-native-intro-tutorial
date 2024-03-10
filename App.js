import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer'
import { useState, useRef } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';


const placeHolderImg = require('./assets/images/background-image.png')

export default function App() {

  const imageRef = useRef();

  const[selectedImage,setSelectedImage]=useState(null);
  const[showAppOptions,setShowAppOptions]=useState(false);
  const [isModalVisible, setIsModalVisible]=useState(false);
  const [pickedEmoji,setPickedEmoji] = useState(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if(status===null){
    requestPermission();
  }

  const pinckImageAsync = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if(!res.canceled){
      // console.log(res);
      setSelectedImage(res.assets[0].uri);
      setShowAppOptions(true);
    }else{
      alert("You didnt pick an Image")
    }
  }

  const onReset=()=>{setShowAppOptions(false)}
  const onAddSticker=()=>{setIsModalVisible(true)}
  const onSaveImageAsync=async()=>{
    try{  
      const localUri = await captureRef(imageRef,{height:440,quality:1})
      await MediaLibrary.saveToLibraryAsync(localUri);
      if(localUri){
        alert("SAVED!!");
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const onModalClose = ()=>{setIsModalVisible(false)}

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
        <ImageViewer placeholderImg={placeHolderImg} selectedImage={selectedImage}/>
        {pickedEmoji && <EmojiSticker stickerSource={pickedEmoji} imageSize={40}/>}
      </View>
      {showAppOptions?(<View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset}/>
          <CircleButton onPress={onAddSticker}/>
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
        </View>
      </View>):(<View style={styles.footerContainer}>
        <Button label="Use this Photo" onPress={()=>setShowAppOptions(true)} />
        <Button label="Choose a photo from the gallery" theme="primary" onPress={pinckImageAsync}/>
      </View>)}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji}></EmojiList>
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
