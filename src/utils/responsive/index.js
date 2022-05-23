import { Dimensions } from 'react-native';

const heightMobileUi = 667;
const widthMobileUi = 375;

export const responsiveWidth = (width) => {
  return (Dimensions.get('window').width * width) / widthMobileUi;
};
export const responsiveHeight = (height) => {
  return (Dimensions.get('window').height * height) / heightMobileUi;
};
