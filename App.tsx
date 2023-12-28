import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from "react-native-modals";
import Navigation from './navigation';
import 'react-native-gesture-handler';
import { PlayerContext } from './context/PlayerContext';
export default function App() {
  return (
    <PlayerContext>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <ModalPortal/>
    </PlayerContext>
  );
}
