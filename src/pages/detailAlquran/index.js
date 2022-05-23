import React from 'react';
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

const DetailAlquran = ({ route, navigation }) => {
  let { data } = route.params;
  const ayat = data.text;
  const arti = data.translations.id.text;
  return (
    <View style={styles.container}>
      <ImageBackground source={Bg1} resizeMode="cover" style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AlQuran');
          }}
        >
          <Image source={Back2} resizeMode="cover" style={styles.buttonBack} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', height: '10%' }}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textcardHeader}>{data.number}</Text>
            </View>
            <View style={styles.wrapTitle}>
              <Text style={styles.title}>{data.name_latin}</Text>
              <Text style={styles.subTitle}>{data.translations.id.name}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ height: '77%', marginTop: 20 }}>
          {Object.keys(ayat).map((index) => {
            return (
              <View style={styles.cardBody} key={index}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity>
                    <Image source={Pause} />
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapAyatArti}>
                  <View style={styles.ayat}>
                    <Text style={styles.textAyat}>{ayat[index]}</Text>
                  </View>
                  <View style={styles.arti}>
                    <Text style={styles.textArti}>
                      {index}. {arti[index]}
                    </Text>
                  </View>
                </View>
              </View>
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
          <TouchableOpacity style={styles.buttonFooter1}>
            <Image source={Play} />
            <View style={{ width: responsiveWidth(20) }} />
            <Text style={styles.textButtonFooter}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFooter2}>
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
  buttonFooter1: {
    flexDirection: 'row',
    width: responsiveWidth(155),
    paddingLeft: 20,
    backgroundColor: '#32CD32',
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
