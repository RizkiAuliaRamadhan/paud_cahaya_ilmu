import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Bg1, Doa, GreenGradient, Logo, Quran } from '../../assets/images';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { getData } from '../../utils/localStorage';
import { getData as getDataUser } from '../../actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';

const HomePage = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [nama, setNama] = useState('');
  const [uid, setUid] = useState('');
  const [bintang, setBintang] = useState(0);

  const dispatch = useDispatch();
  const dataReducerResult = useSelector((state) => state.DataReducer.dataResult);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = setVisible(false);

      // return () => unsubscribe();
    }, [navigation])
  );

  useEffect(() => {
    getData('user').then((res) => {
      setNama(res.nama);
      setUid(res.uid);
    });
    dispatch(getDataUser());
  }, []);

  useEffect(() => {
    const dataSiswa = Object.keys(dataReducerResult).map((key) => {
      if (uid === dataReducerResult[key].uid) {
        setBintang(dataReducerResult[key].bintang);
      } else {
        setBintang(0);
      }
      return 0;
    });
    dataSiswa;
  }, [dataReducerResult]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <Animatable.View
          style={styles.header}
          animation={visible ? 'fadeOutUp' : 'fadeInDown'}
          duration={1200}
          delay={500}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text1}>Assalamu'alaikum</Text>
            <Text style={styles.text1}>{nama}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LottieView
              source={require('../../assets/animations/star.json')}
              autoPlay
              loop
              style={{ width: 50, height: 50 }}
            />
            <View style={{ paddingRight: 5 }} />
            <Text style={styles.text1}>{bintang}</Text>
          </View>
        </Animatable.View>
        <View style={{ height: '85%', justifyContent: 'space-between' }}>
          <Animatable.View
            style={styles.logo}
            animation={visible ? 'fadeOut' : 'fadeIn'}
            duration={1200}
            delay={1000}
          >
            <Image
              source={Logo}
              style={{ width: responsiveWidth(150), height: responsiveHeight(140) }}
            />
          </Animatable.View>
          <Animatable.View
            animation={visible ? 'fadeOutDown' : 'fadeInUp'}
            duration={1200}
            delay={1000}
          >
            {/* button al quran */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(!visible);
                setTimeout(() => {
                  navigation.navigate('AlQuran');
                }, 1200);
              }}
            >
              <Image source={GreenGradient} style={styles.backgroundButton} />
              <View style={styles.contentButton}>
                <Animatable.Image
                  source={Quran}
                  animation="fadeIn"
                  iterationCount="infinite"
                  useNativeDriver
                  direction="alternate"
                ></Animatable.Image>
                <View style={{ marginLeft: 35 }} />
                <Text style={styles.textButton}>Al Quran</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 30 }} />
            {/* button doa */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(!visible);
                setTimeout(() => {
                  navigation.navigate('DoaPage');
                }, 1200);
              }}
            >
              <Image source={GreenGradient} style={styles.backgroundButton} />
              <View style={styles.contentButton2}>
                <Animatable.Image
                  source={Doa}
                  animation="fadeIn"
                  iterationCount="infinite"
                  useNativeDriver
                  direction="alternate"
                ></Animatable.Image>
                <View style={{ marginLeft: 20 }} />
                <Text style={styles.textButton}>Doa Harian</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 30 }} />
            {/* button riwayat */}
            <TouchableOpacity style={styles.button}>
              <Image source={GreenGradient} style={styles.backgroundButton} />
              <View style={styles.contentButton}>
                <LottieView
                  source={require('../../assets/animations/list.json')}
                  autoPlay
                  loop
                  style={{ width: 80, height: 80 }}
                />
                <View style={{ marginLeft: 20 }} />
                <Text style={styles.textButton}>Riwayat Hafalan</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  logo: {
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    height: responsiveHeight(90),
    // marginTop: 50,
  },
  backgroundButton: {
    width: '100%',
    height: responsiveHeight(90),
    borderRadius: 10,
    display: 'flex',
  },
  contentButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
    top: 0,
  },
  contentButton2: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
    top: 5,
  },
  textButton: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    // marginTop: 5,
  },
});

export default HomePage;
