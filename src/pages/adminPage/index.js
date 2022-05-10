import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Arrow, Home, Login, Logo, Logout } from '../../assets/images';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../actions/dataActions';
import { storeData } from '../../utils/localStorage';
import { loginUser } from '../../actions/authActions';
import { getAuth, signOut } from 'firebase/auth';

const AdminPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const dataReducerResult = useSelector((state) => state.DataReducer.dataResult);
  useEffect(() => {
    dispatch(getData());
  }, []);

  const jumlahData = Object.keys(dataReducerResult).map((key) => dataReducerResult[key].role);

  const jumlahGuru = jumlahData.filter((result) => result == 'guru');
  const jumlahSiswa = jumlahData.filter((result) => result == 'siswa');

  const logout = () => {
    storeData(false);
    dispatch(loginUser('', ''));
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('LoginPage');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {}, [logout]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Login} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
            <Image source={Home} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()}>
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
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                  {jumlahSiswa.length}
                </Text>
              </View>
              <Image source={Arrow} style={{ marginRight: 20 }} />
            </TouchableOpacity>
            {/* button2 */}
            <View style={{ marginTop: 25 }} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate('DaftarGuruPage')}
            >
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
                  {jumlahGuru.length}
                </Text>
              </View>
              <Image source={Arrow} style={{ marginRight: 20 }} />
            </TouchableOpacity>
            {/* button3 Riwayat Hafalan */}
            <View style={{ marginTop: 25 }} />
            <TouchableOpacity
              style={styles.button3}
              onPress={() => navigation.navigate('RiwayatAdmin')}
            >
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
