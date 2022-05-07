import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Login, Tambah, Edit, Delete } from '../../assets/images';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { DeleteData, getDataGuru } from '../../actions/dataActions';

const DaftarGuruPage = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const [tambah, setTambah] = useState(true);
  const [hapus, setHapus] = useState(false);

  const [nama, setNama] = useState('');
  const [tgl, setTgl] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uid, setUid] = useState('');

  const dispatch = useDispatch();
  const userReducerLoading = useSelector((state) => state.AuthReducer.registerLoading);
  const dataGuruReducerResult = useSelector((state) => state.DataReducer.dataGuruResult);

  useEffect(() => {
    dispatch(getDataGuru());
  }, []);

  const tambahData = () => {
    if (nama === '' || tgl === '') {
      setError(true);
    } else {
      let email = nama + '@paudcahayailmu.com';
      email = email.replace(/\s/g, '');
      const datas = {
        email,
        nama,
        tgl,
        role: 'guru',
      };
      dispatch(registerUser(datas, tgl, datas.role));
      setTimeout(() => {
        navigation.replace('AdminPage');
      }, 2000);
    }
  };

  const deleteData = () => {
    dispatch(DeleteData('guru', uid));
    setHapus(false);
  };

  return (
    <View style={styles.container}>
      {/* delete data */}
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
      {/* Modal Data */}
      <Portal>
        <Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          {/* form tambah data guru atau admin */}
          <View>
            <Text style={styles.titleModal}>Tambah Data</Text>
            <Text style={styles.titleModal}>Guru</Text>
            <View style={{ marginBottom: 25 }} />
            <TextInput
              mode="outlined"
              label="Nama"
              value={nama}
              onChangeText={(value) => setNama(value)}
              outlineColor="#1E40AF"
              activeOutlineColor="#1E40AF"
              style={styles.input}
              error={error}
            />
            <View style={{ marginBottom: 20 }} />
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Tanggal Lahir"
              value={tgl}
              onChangeText={(value) => setTgl(value)}
              outlineColor="#1E40AF"
              activeOutlineColor="#1E40AF"
              style={styles.input}
              error={error}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#3490DC' }}>Tanggal-Bulan-Tahun</Text>
              <Text style={{ fontSize: 12, color: '#3490DC', marginBottom: 20 }}>28032017</Text>
            </View>
            <Button
              mode="contained"
              theme={{ roundness: 50 }}
              loading={userReducerLoading}
              style={styles.button}
              onPress={() => tambahData()}
            >
              Tambah
            </Button>
          </View>
        </Modal>
      </Portal>
      <ImageBackground source={Login} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.title}>Guru</Text>
        </View>
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(dataGuruReducerResult).map((key, index) => {
              const data = dataGuruReducerResult[key];
              return (
                <View key={index}>
                  {/* Box */}
                  <View style={styles.box}>
                    <View style={styles.itemBox1}>
                      <Text style={styles.itemTextBox1}>{data.nama}</Text>
                      {/* <Text style={styles.itemTextBox1}>{data.tgl}</Text> */}
                    </View>
                    <View style={styles.itemBox2}>
                      <View style={{ marginRight: 5 }} />
                      {/* Butt0n Delete */}
                      <TouchableOpacity
                        onPress={() => {
                          setHapus(true);
                          setUid(key);
                        }}
                      >
                        <Image source={Delete} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* enBox */}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              setError(false);
              setTambah(true);
              showModal();
            }}
          >
            <Image source={Tambah} />
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginHorizontal: 45,
    borderRadius: 10,
    // alignItems: 'center',
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
  titleModal: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    maxWidth: '100%',
    width: 400,
    height: 50,
    justifyContent: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  body: {
    flex: 8,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
  },
  itemBox1: {
    justifyContent: 'center',
  },
  itemTextBox1: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  itemBox2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DaftarGuruPage;
