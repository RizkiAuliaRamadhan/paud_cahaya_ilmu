import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Doa, Login, Logo } from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import { getData } from '../../utils/localStorage';

const SplashPage = ({ navigation }) => {
  const cek = () => {
    getData('user').then((res) => {
      if (res) {
        if (res.role === 'siswa') {
          setTimeout(() => {
            navigation.replace('HomePage');
          }, 2000);
        } else if (res.role === 'guru') {
          setTimeout(() => {
            navigation.replace('AdminPage');
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace('LoginPage');
        }, 2000);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      cek();
    });

    return unsubscribe;
  }, [navigation]);

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
