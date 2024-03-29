import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AdminPage,
  AlQuran,
  HomePage,
  LoginPage,
  SplashPage,
  SiswaPage,
  DaftarSiswaPage,
  DaftarGuruPage,
  RiwayatAdmin,
  DetailAlquran,
  DoaPage,
  RiwayatHafalanSiswa,
  RiwayatHafalanAll,
} from '../pages';
import DetailDoa from '../pages/detailDoa';

const Stack = createNativeStackNavigator();

const options = { headerShown: false, statusBarHidden: true };

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashPage">
        <Stack.Screen name="SplashPage" component={SplashPage} options={options} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={options} />
        <Stack.Screen name="HomePage" component={HomePage} options={options} />
        <Stack.Screen name="AlQuran" component={AlQuran} options={options} />
        <Stack.Screen name="AdminPage" component={AdminPage} options={options} />
        <Stack.Screen name="SiswaPage" component={SiswaPage} options={options} />
        <Stack.Screen name="DaftarSiswaPage" component={DaftarSiswaPage} options={options} />
        <Stack.Screen name="DaftarGuruPage" component={DaftarGuruPage} options={options} />
        <Stack.Screen name="RiwayatAdmin" component={RiwayatAdmin} options={options} />
        <Stack.Screen name="DetailAlquran" component={DetailAlquran} options={options} />
        <Stack.Screen name="DoaPage" component={DoaPage} options={options} />
        <Stack.Screen name="DetailDoa" component={DetailDoa} options={options} />
        <Stack.Screen
          name="RiwayatHafalanSiswa"
          component={RiwayatHafalanSiswa}
          options={options}
        />
        <Stack.Screen name="RiwayatHafalanAll" component={RiwayatHafalanAll} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
