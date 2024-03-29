import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Login, Logo } from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import { Button, Checkbox, Colors, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/userActions';
import { loginUser } from '../../actions/authActions';
import { getData } from '../../utils/localStorage';

const LoginPage = ({ navigation }) => {
  const [Nama, setNama] = useState('');
  const [Tgl, setTgl] = useState('');
  const [hide, setHide] = useState(true);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState('');

  // reducer
  const dispatch = useDispatch();
  const dataUserReducer = useSelector((state) => state.AuthReducer.loginResult);
  const loginReducerLoading = useSelector((state) => state.AuthReducer.loginLoading);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const login = () => {
    if (Nama && Tgl) {
      let email = Nama;
      email = email.replace(/\s/g, '');
      email = email.toLowerCase();
      dispatch(loginUser(email, Tgl));
    } else {
      console.log('login gagal');
      if ((Nama === '') & (Tgl == '')) {
        setTextError('Username dan Password wajib diisi !');
      } else {
        setTextError('Username dan Password tidak cocok !');
      }
      setError(true);
    }
  };

  useEffect(() => {
    if (dataUserReducer.role === 'siswa') {
      navigation.replace('HomePage');
    } else if (dataUserReducer.role === 'guru') {
      navigation.replace('AdminPage');
    }
  }, [login]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Login} resizeMode="cover" style={styles.backgroundImage}>
        <View style={{ alignItems: 'center' }}>
          <Animatable.Image
            source={Logo}
            animation="pulse"
            iterationCount="infinite"
            useNativeDriver
            direction="alternate"
          ></Animatable.Image>
        </View>
        <View style={{ marginTop: 40 }} />
        <View style={{ width: '100%' }}>
          <TextInput
            mode="outlined"
            theme={{ roundness: 25 }}
            // label="Nama Siswa"
            placeholder="Username"
            placeholderTextColor="#999"
            value={Nama}
            onChangeText={(value) => setNama(value)}
            outlineColor="#1E40AF"
            activeOutlineColor="#1E40AF"
            style={styles.input}
            error={error}
          />
        </View>
        <View style={{ marginTop: 20 }} />
        <View style={{ width: '100%' }}>
          <TextInput
            mode="outlined"
            theme={{ roundness: 25 }}
            placeholder="Password"
            placeholderTextColor="#999"
            value={Tgl}
            onChangeText={(value) => setTgl(value)}
            outlineColor="#1E40AF"
            activeOutlineColor="#1E40AF"
            selectionColor="#1E40AF"
            secureTextEntry={hide}
            error={error}
            right={
              <TextInput.Icon
                name={hide ? 'eye' : 'eye-off'}
                color={error ? Colors.red900 : Colors.blue900}
                onPress={() => setHide(!hide)}
                style={{ paddingTop: 7 }}
              />
            }
            style={styles.input}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.textError}>{error ? textError : ''}</Text>
        </View>
        <View style={{ marginTop: 20 }} />
        <View style={{ width: '100%' }}>
          <Button
            mode="contained"
            theme={{ roundness: 50 }}
            onPress={() => {
              login();
            }}
            labelStyle={{ color: '#fff' }}
            loading={loginReducerLoading}
            style={styles.button}
          >
            Masuk
          </Button>
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
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    justifyContent: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
  },
  textError: {
    color: Colors.red900,
  },
});

export default LoginPage;
