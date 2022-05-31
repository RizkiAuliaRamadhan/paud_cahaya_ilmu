import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pause, Play } from '../assets/images';
import useSound from 'react-native-use-sound';

const AlQuran = ({ dataAyat, dataArti, index, play, pause, data }) => {
  const [playing, setPlaying] = useState(false);

  //   const coolMusic = dataFile;
  //   const [play, pause, stop, data] = useSound(coolMusic);
  //   const playPause = () => {
  //     if (data.isPlaying) pause();
  //     else play();
  //   };

  return (
    <View style={styles.cardBody}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ width: 25, height: 25 }}
          onPress={() => {
            setPlaying(!playing);
            if (!playing) {
              data.seek(9);
              //   data.duration(5);
              play();
            } else {
              pause();
            }
          }}
        >
          <Image source={playing ? Pause : Play} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapAyatArti}>
        <View style={styles.ayat}>
          <Text style={styles.textAyat}>{dataAyat[index]}</Text>
        </View>
        <View style={styles.arti}>
          <Text style={styles.textArti}>
            {index}. {dataArti[index]}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: 'row',
    // padding: 5,
    backgroundColor: '#BB495E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    marginBottom: 20,
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
});

export default AlQuran;
