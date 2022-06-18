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
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import RekamModal from '../../components/RekamModal';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const DetailDoa = ({ route, navigation }) => {
  const [isPlayingg, setIsPlayingg] = useState(true);

  // modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  let { dataDoa } = route.params;
  const ayat = dataDoa.text;
  const arti = dataDoa.arti;
  const textLatin = dataDoa.textLatin;

  const coolMusic = dataDoa.file;
  const [play, pause, stop, data] = useSound(coolMusic);

  const playPause = () => {
    if (data.isPlaying) pause();
    else play();
  };

  useEffect(() => {
    setIsPlayingg(!isPlayingg);
  }, [data.isPlaying]);

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log(result);
  };

  useEffect(() => {
    onStopRecord();
  }, [visible]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            stop();
            navigation.navigate('DoaPage');
          }}
        >
          <Image source={Back2} resizeMode="cover" style={styles.buttonBack} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.cardHeader}>
            <Text style={styles.textcardHeader}>{dataDoa.name}</Text>
          </View>
        </View>
        {/* modal rekam */}
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <RekamModal
              audioRecorderPlayer={audioRecorderPlayer}
              navigation={navigation}
              name={dataDoa.name}
            />
          </Modal>
        </Portal>
        <ScrollView style={{ height: '77%', marginTop: 20 }}>
          <View style={styles.cardBody}>
            <View style={styles.wrapAyatArti}>
              <View style={styles.ayat}>
                <Text style={styles.textAyat}>{ayat}</Text>
              </View>
              <View style={styles.latin}>
                <Text style={styles.textLatin}>{textLatin}</Text>
              </View>
              <View style={styles.arti}>
                <Text style={styles.textArti}>{arti}</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 30 }} />
          {dataDoa.text2 && (
            <View style={styles.cardBody}>
              <View style={styles.wrapAyatArti}>
                <View style={styles.ayat}>
                  <Text style={styles.textAyat}>{dataDoa.text2}</Text>
                </View>
                <View style={styles.latin}>
                  <Text style={styles.textLatin}>{dataDoa.textLatin2}</Text>
                </View>
                <View style={styles.arti}>
                  <Text style={styles.textArti}>{dataDoa.arti2}</Text>
                </View>
              </View>
            </View>
          )}
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
          <TouchableOpacity style={styles.buttonFooter2} onPress={() => showModal()}>
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
    backgroundColor: '#800080',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
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
    color: '#fff',
    textAlign: 'center',
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

  wrapAyatArti: {
    flex: 5,
  },
  ayat: {
    backgroundColor: '#EE6969',
    padding: 7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 10,
  },
  arti: {
    backgroundColor: '#DBDBDB',
    padding: 7,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
  },
  latin: {
    backgroundColor: '#DBDBDB',
    padding: 7,
  },
  textAyat: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
  textArti: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
  textLatin: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

const containerStyle = {
  backgroundColor: 'white',
  // padding: 20,
  marginHorizontal: 10,
  borderRadius: 15,
};

export default DetailDoa;
