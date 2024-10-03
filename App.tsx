/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { Navigator } from './src/navigation/Navigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7c7c7c",
    elevation: {
      ...DefaultTheme.colors.elevation,
    }
  },
};


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  )

}

export default App;
