import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Back, Bg1, ButtonOrange } from '../../assets/images';
import doa from '../../data/doa';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';
import * as Animatable from 'react-native-animatable';

const DoaPage = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = setVisible(false);

      // return () => unsubscribe();
    }, [navigation])
  );
  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
            setTimeout(() => {
              navigation.navigate('HomePage');
            }, 1200);
          }}
        >
          <Image source={Back} style={{ marginBottom: 15 }} />
        </TouchableOpacity>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.column}>
            {Object.keys(doa).map((index, value) => {
              return (
                <Animatable.View
                  animation={
                    visible
                      ? index % 2 == 0
                        ? 'fadeOutLeft'
                        : 'fadeOutRight'
                      : index % 2 == 0
                      ? 'fadeInLeft'
                      : 'fadeInRight'
                  }
                  duration={1200}
                  delay={500}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(!visible);
                      setTimeout(() => {
                        navigation.navigate('DetailDoa', { dataDoa: doa[index] });
                      }, 1200);
                    }}
                    style={styles.button}
                  >
                    <ImageBackground source={ButtonOrange} style={styles.ImageBackgroundButton}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.number}>{index}</Text>
                      </View>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={styles.name}>{doa[index].name}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </Animatable.View>
              );
            })}
          </View>
        </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  body: {},
  column: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    width: responsiveWidth(300),
    height: responsiveHeight(100),
  },
  ImageBackgroundButton: {
    flexDirection: 'row',
    height: responsiveHeight(100),
    width: responsiveWidth(300),
    paddingLeft: responsiveWidth(15),
    paddingVertical: 10,
    paddingRight: 10,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  terjemah: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
  },
});

export default DoaPage;
