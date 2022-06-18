import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  ActivityIndicator,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import { getData } from '../utils/localStorage';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { uploadRekaman } from '../actions/rekamanActions';

const RNFetchBlob = NativeModules.RNFetchBlob;

const RekamModal = ({ audioRecorderPlayer, navigation, name }) => {
  // state record
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setrecordTime] = useState('00:00:00');
  // const [currentPositionSec, setcurrentPositionSec] = useState(0);
  // const [currentDurationSec, setcurrentDurationSec] = useState(0);
  // const [playTime, setplayTime] = useState('00:00:00');
  // const [duration, setduration] = useState('00:00:00');
  const [pause, setpause] = useState(true);
  const [rekam, setrekam] = useState(true);
  const [rekamSelesai, setrekamSelesai] = useState(true);

  const [user, setUser] = useState('');
  const [nameFileRecord, setNameFileRecord] = useState('');
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);

  // //
  // // record audio
  // //
  const onStartRecord = async () => {
    setrekam(!rekam);
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };

    console.log('audioSet', audioSet);
    //? Custom path
    // const uri = await this.audioRecorderPlayer.startRecorder(
    //   this.path,
    //   audioSet,
    // );
    const dirs = utils.FilePath.TEMP_DIRECTORY;

    let nameFile = user.nama.replace(/\s/g, '');
    let date = new Date();
    date = date.getTime();
    setTime(date);

    nameFile = nameFile.toLowerCase();
    nameFile = `${nameFile}${date}`;

    const path = Platform.select({
      android: `${dirs}/${name}-${nameFile}.mp3`,
    });

    setNameFileRecord(nameFile);

    //? Default path
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e) => {
      // console.log('record-back', e);
      setrecordSecs(e.currentPosition);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(`uri: ${uri}`);

    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording . . . ', e.currentPosition);
      return;
    });
  };

  const onPauseRecord = async () => {
    setpause(!pause);
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async () => {
    setpause(!pause);
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = async () => {
    setrekamSelesai(!rekamSelesai);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    console.log(result);
  };

  // const onStartPlay = async () => {
  //   console.log('onStartPlay');
  //   const msg = await audioRecorderPlayer.startPlayer();
  //   console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener((e) => {
  //     setcurrentPositionSec(e.currentPosition);
  //     setcurrentDurationSec(e.duration);
  //     setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
  //     setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
  //     return;
  //   });
  // };

  // const onPausePlay = async () => {
  //   await audioRecorderPlayer.pausePlayer();
  // };

  // const onStopPlay = async () => {
  //   console.log('onStopPlay');
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  // };

  const dispatch = useDispatch();

  const sendRekaman = async () => {
    setLoading(true);
    const reference = storage().ref(`/rekaman/${name}-${nameFileRecord}.mp3`);
    const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${name}-${nameFileRecord}.mp3`;
    await reference.putFile(pathToFile);
    const downloadUrl = await reference.getDownloadURL();
    const namaFile = `${name}-${nameFileRecord}`;
    dispatch(uploadRekaman(time, user.uid, downloadUrl, namaFile));
    setTimeout(() => {
      setLoading(false);
      alert('Rekaman berhasil dikirim');
      navigation.navigate('HomePage');
    }, 5000);
  };

  useEffect(() => {
    getData('user').then((res) => {
      setUser(res);
    });
    return () => {
      // onStopRecord();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Rekam Hafalan</Text>
      <Text style={styles.txtRecordCounter}>{recordTime}</Text>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => onStartRecord()}
        disabled={rekam ? false : true}
      >
        <Text style={{ color: '#fff' }}>Rekam</Text>
      </TouchableOpacity>
      {rekam ? (
        <View />
      ) : (
        <View>
          <View style={styles.row}>
            {pause ? (
              <TouchableOpacity onPress={() => onPauseRecord()} style={styles.button2}>
                <Text style={{ color: '#fff' }}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onResumeRecord()} style={styles.button2}>
                <Text style={{ color: '#fff' }}>Lanjut</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => onStopRecord()} style={styles.button3}>
              <Text style={{ color: '#fff' }}>Selesai</Text>
            </TouchableOpacity>
          </View>
          {rekamSelesai ? (
            <View />
          ) : (
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                sendRekaman();
              }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Kirim Rekaman</Text>
            </TouchableOpacity>
          )}
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    // backgroundColor: '#004643',
  },
  titleTxt: {
    color: '#000',
    fontSize: 20,
    marginBottom: 10,
  },
  txtRecordCounter: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  button1: {
    padding: 8,
    backgroundColor: '#32CD32',
    borderRadius: 10,
    marginVertical: 10,
  },
  button2: {
    padding: 8,
    backgroundColor: '#ffd803',
    // backgroundColor: '#eff0f3',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  button3: {
    padding: 8,
    backgroundColor: '#8546f0',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default RekamModal;
