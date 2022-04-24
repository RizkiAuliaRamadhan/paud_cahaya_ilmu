import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Login, Logo } from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import { TextInput, Button, Checkbox, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/userActions';

const LoginPage = ({ navigation }) => {
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState('');

  // reducer
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.UserReducer.dataUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(userReducer);

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
            label="NIS (Nomor Induk Siswa)"
            value={nis}
            onChangeText={(value) => setNis(value)}
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
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            outlineColor="#1E40AF"
            activeOutlineColor="#1E40AF"
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
        <View style={{ marginTop: 25 }} />
        <View style={{ width: '100%' }}>
          <Button
            mode="contained"
            theme={{ roundness: 50 }}
            onPress={() => {
              if (nis == userReducer.nis && password == userReducer.password) {
                navigation.replace('AdminPage');
              } else {
                console.log('login gagal');
                if ((nis === '') & (password == '')) {
                  setTextError('NIS dan Password wajib diisi !');
                } else {
                  setTextError('NIS dan Password tidak cocok !');
                }
                setError(true);
              }
            }}
            loading={loading}
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
