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
import { Back, Bg1, Tombol1, Tombol2, Tombol3, Tombol4 } from '../../assets/images';
import juzAmma from '../../data/juzAmma';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';
import * as Animatable from 'react-native-animatable';

const backGroundImages = [Tombol1, Tombol2, Tombol3];

const AlQuran = ({ navigation }) => {
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
          <View style={styles.row}>
            {Object.keys(juzAmma)
              .slice(0)
              .reverse()
              .map((index, value) => {
                const rndInt = Math.floor(Math.random() * backGroundImages.length);

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
                          navigation.navigate('DetailAlquran', { dataQuran: juzAmma[index] });
                        }, 1200);
                      }}
                    >
                      <ImageBackground
                        source={backGroundImages[rndInt]}
                        style={{
                          height: responsiveHeight(70),
                          width: responsiveWidth(165),
                          marginBottom: 20,
                        }}
                      >
                        <View style={styles.card}>
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.number}>{juzAmma[index].number}</Text>
                          </View>
                          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.nameLatin}>{juzAmma[index].name_latin}</Text>
                            <Text style={styles.terjemah}>
                              {juzAmma[index].translations.id.name}
                            </Text>
                          </View>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  nameLatin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  terjemah: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
  },
});

export default AlQuran;
