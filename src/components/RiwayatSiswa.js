import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Delete, Pause, Play, IconStar, IconStarBorder } from '../assets/images';
import useSound from 'react-native-use-sound';
import database from '@react-native-firebase/database';

import { Modal, Portal } from 'react-native-paper';

const RiwayatSiswa = ({ url, namaFile, bintang, keys }) => {
  const coolMusic = url;
  const [play, pause, stop, data] = useSound(coolMusic);
  const [hapus, setHapus] = useState(false);

  const deleteIcon = async () => {
    setHapus(!hapus);
  };

  const deleteData = async () => {
    await database().ref(`/rekamans/${keys}`).remove();
  };

  return (
    <>
      {/* modal alert */}
      <Portal>
        <Modal
          visible={hapus}
          onDismiss={() => setHapus(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.titleModal}>Yakin data mau dihapus ?</Text>
          <View style={styles.modalDelete}>
            <TouchableOpacity style={styles.buttonDelete1} onPress={() => setHapus(false)}>
              <Text style={styles.textButtonDelete}>Tidak</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete2} onPress={() => deleteData()}>
              <Text style={styles.textButtonDelete}>Iya</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <View style={styles.cardBody}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ width: 25, height: 25 }}
            onPress={() => {
              if (data.isPlaying) pause();
              else play();
            }}
          >
            <Image source={data.isPlaying ? Pause : Play} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapAyatArti}>
          <View style={styles.ayat}>
            <Text style={styles.textAyat}>{namaFile}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardBody2}>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteIcon()}>
          <Image source={Delete} style={styles.iconDelete} />
        </TouchableOpacity>
        <View style={styles.star}>
          {bintang == 0 && (
            <>
              <Image source={IconStarBorder} style={styles.icon} />
              <Image source={IconStarBorder} style={styles.icon} />
              <Image source={IconStarBorder} style={styles.icon} />
            </>
          )}
          {bintang == 1 && (
            <>
              <Image source={IconStar} style={styles.icon} />
              <Image source={IconStarBorder} style={styles.icon} />
              <Image source={IconStarBorder} style={styles.icon} />
            </>
          )}
          {bintang == 2 && (
            <>
              <Image source={IconStar} style={styles.icon} />
              <Image source={IconStar} style={styles.icon} />
              <Image source={IconStarBorder} style={styles.icon} />
            </>
          )}
          {bintang == 3 && (
            <>
              <Image source={IconStar} style={styles.icon} />
              <Image source={IconStar} style={styles.icon} />
              <Image source={IconStar} style={styles.icon} />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: 'row',
    // padding: 5,
    backgroundColor: '#BB495E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginBottom: 20,
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
  cardBody2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
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
  buttonDelete: {
    flex: 1,
    backgroundColor: '#fec7d7',
    borderBottomStartRadius: 10,
  },
  iconDelete: {
    height: 25,
    width: 25,
    margin: 10,
  },
  icon: {
    height: 25,
    width: 25,
  },
  star: {
    flex: 4.6,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginHorizontal: 45,
    borderRadius: 10,
    // alignItems: 'center',
  },
  titleModal: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
  modalDelete: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  buttonDelete1: {
    backgroundColor: '#3490DC',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  buttonDelete2: {
    backgroundColor: '#F00000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textButtonDelete: {
    color: '#fff',
    fontSize: 20,
  },
});

export default RiwayatSiswa;
