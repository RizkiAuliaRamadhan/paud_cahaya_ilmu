import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/reducer/store';
import { name as appName } from './app.json';
import App from './src/App';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
