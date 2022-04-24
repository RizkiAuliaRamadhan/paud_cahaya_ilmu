import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Arrow, Home, Login, Logo, Logout } from '../../assets/images';
import LottieView from 'lottie-react-native';

const AdminPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Login} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
            <Image source={Home} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Logout} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={{ alignItems: 'center' }}>
            <Image source={Logo} />
          </View>
          <View style={{}}>
            {/* button1 */}
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('SiswaPage')}
            >
              <LottieView
                source={require('../../assets/animations/siswa.json')}
                autoPlay
                loop
                style={{ width: 75, height: 75, marginTop: -5 }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                  Jumlah Siswa
                </Text>
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>36</Text>
              </View>
              <Image source={Arrow} style={{ marginRight: 20 }} />
            </TouchableOpacity>
            {/* button2 */}
            <View style={{ marginTop: 25 }} />
            <TouchableOpacity style={styles.button2}>
              <LottieView
                source={require('../../assets/animations/guru.json')}
                autoPlay
                loop
                style={{ width: 60, height: 60, marginLeft: 10 }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: -10 }}>
                  Jumlah Guru
                </Text>
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginLeft: -10 }}>
                  6
                </Text>
              </View>
              <Image source={Arrow} style={{ marginRight: 20 }} />
            </TouchableOpacity>
            {/* button3 */}
            <View style={{ marginTop: 25 }} />
            <TouchableOpacity style={styles.button3}>
              <LottieView
                source={require('../../assets/animations/listhafalan.json')}
                autoPlay
                loop
                style={{ width: 75, height: 75 }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                  Riwayat Hafalan
                </Text>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Siswa</Text>
              </View>
              <Image source={Arrow} style={{ marginRight: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  body: {
    paddingHorizontal: 25,
    height: '85%',
    justifyContent: 'space-evenly',
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    width: '100%',
    backgroundColor: '#3490DC',
    borderRadius: 10,
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    width: '100%',
    backgroundColor: '#05D934',
    borderRadius: 10,
  },
  button3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    width: '100%',
    backgroundColor: '#FFC700',
    borderRadius: 10,
  },
});

export default AdminPage;
