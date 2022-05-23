import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Login } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';

const SiswaPAge = ({ navigation }) => {
  const dispatch = useDispatch();
  const dataReducerResult = useSelector((state) => state.DataReducer.dataResult);

  const jumlahDataSiswaDetail = Object.keys(dataReducerResult).map(
    (key) => dataReducerResult[key].kelas
  );
  const jumlahSiswaA = jumlahDataSiswaDetail.filter((result) => result == 'A');
  const jumlahSiswaB = jumlahDataSiswaDetail.filter((result) => result == 'B');

  return (
    <View style={styles.container}>
      <ImageBackground source={Login} resizeMode="cover" style={styles.backgroundImage}>
        {/* button 1 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('DaftarSiswaPage', { kelas: 'A' });
          }}
        >
          <View style={styles.content1}>
            <Text style={styles.textButton}>Kelas A</Text>
            <Text style={styles.textButton}>{jumlahSiswaA.length}</Text>
          </View>
        </TouchableOpacity>
        {/* button 1 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('DaftarSiswaPage', { kelas: 'B' });
          }}
        >
          <View style={styles.content2}>
            <Text style={styles.textButton}>Kelas B</Text>
            <Text style={styles.textButton}>{jumlahSiswaB.length}</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 45,
  },
  content1: {
    width: '100%',
    height: 185,
    backgroundColor: '#3490DC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  content2: {
    width: '100%',
    height: 185,
    backgroundColor: '#05D934',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textButton: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default SiswaPAge;
