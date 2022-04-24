import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Doa, Login, Logo } from '../../assets/images';
import * as Animatable from 'react-native-animatable';

const SplashPage = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginPage');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={Login} resizeMode="cover" style={styles.backgroundImage}>
        <Animatable.Image source={Logo} animation="zoomIn"></Animatable.Image>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashPage;
