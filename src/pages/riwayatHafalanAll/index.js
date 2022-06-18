import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { getRekaman } from '../../actions/rekamanActions';
import { useDispatch, useSelector } from 'react-redux';
import { Back2, Bg1, Play, Pause } from '../../assets/images';
import { getData } from '../../utils/localStorage';
import RiwayatAll from '../../components/RiwayatAll';

const RiwayatHafalanAll = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [uid, setUid] = useState('');

  const dispatch = useDispatch();
  const dataRekamanReducerResult = useSelector((state) => state.RekamanReducer.getRekamanResult);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      dispatch(getRekaman());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AdminPage');
          }}
          style={styles.buttonBack}
        >
          <Image source={Back2} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Riwayat Hafalan</Text>
        </View>
        <ScrollView>
          {Object.keys(dataRekamanReducerResult).map((index) => {
            return (
              <RiwayatAll
                key={index}
                url={dataRekamanReducerResult[index].url}
                namaFile={dataRekamanReducerResult[index].namaFile}
                bintang={dataRekamanReducerResult[index].bintang}
                keys={index}
              />
            );
          })}
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
    padding: 20,
  },
  buttonBack: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 20,
    left: 15,
  },
  header: {
    padding: 5,
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
  textAyat: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
});

export default RiwayatHafalanAll;
