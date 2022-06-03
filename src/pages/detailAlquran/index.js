import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Bg1, Back2, Pause, Play, Rekam } from '../../assets/images';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';
import useSound from 'react-native-use-sound';
import AlQuran from '../../components/AlQuran';

const DetailAlquran = ({ route, navigation }) => {
  const [isPlayingg, setIsPlayingg] = useState(true);

  let { dataQuran } = route.params;
  const ayat = dataQuran.text;
  const arti = dataQuran.translations.id.text;

  const coolMusic = dataQuran.file;
  const [play, pause, stop, data] = useSound(coolMusic);

  const playPause = () => {
    if (data.isPlaying) pause();
    else play();
  };

  useEffect(() => {
    setIsPlayingg(!isPlayingg);
  }, [data.isPlaying]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            stop();
            navigation.navigate('AlQuran');
          }}
        >
          <Image source={Back2} resizeMode="cover" style={styles.buttonBack} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', height: '10%' }}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textcardHeader}>{dataQuran.number}</Text>
            </View>
            <View style={styles.wrapTitle}>
              <Text style={styles.title}>{dataQuran.name_latin}</Text>
              <Text style={styles.subTitle}>{dataQuran.translations.id.name}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ height: '77%', marginTop: 20 }}>
          {Object.keys(ayat).map((index) => {
            return (
              <AlQuran
                dataAyat={ayat}
                dataArti={arti}
                index={index}
                key={index}
                play={play}
                pause={pause}
                data={data}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            height: '13%',
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={!isPlayingg ? styles.buttonFooterplay : styles.buttonFooterpause}
            onPress={() => {
              playPause();
            }}
          >
            <Image source={!isPlayingg ? Play : Pause} />
            <View style={{ width: responsiveWidth(20) }} />
            <Text style={styles.textButtonFooter}>{!isPlayingg ? 'Play' : 'Pause'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFooter2} onPress={() => {}}>
            <Image source={Rekam} />
            <View style={{ width: responsiveWidth(20) }} />
            <Text style={styles.textButtonFooter}>Rekam</Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  buttonBack: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
  cardHeader: {
    // padding: 10,
    backgroundColor: '#DBDBDB',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textcardHeader: {
    fontSize: 20,
    fontWeight: '700',
  },
  wrapTitle: {
    flex: 3,
    backgroundColor: '#800080',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 12,
    color: '#eee',
    fontWeight: '500',
  },
  buttonFooterplay: {
    flexDirection: 'row',
    width: responsiveWidth(155),
    paddingLeft: 20,
    backgroundColor: '#32CD32',
    borderRadius: 10,
    height: responsiveHeight(55),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonFooterpause: {
    flexDirection: 'row',
    width: responsiveWidth(155),
    paddingLeft: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    height: responsiveHeight(55),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonFooter2: {
    flexDirection: 'row',
    width: responsiveWidth(155),
    paddingLeft: 20,
    backgroundColor: '#9932CC',
    borderRadius: 10,
    height: responsiveHeight(55),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  textButtonFooter: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default DetailAlquran;