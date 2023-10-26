/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from './screens/Logo';
import HomePage from './screens/HomePage';
import TwoPlayer2 from './screens/TwoPlayer2';
import OnePlayer2 from './screens/OnePlayer2';
import Customize from './screens/Customize';
import Favorites from './screens/Favorites';
import Stats from './screens/Stats';
import HowToPlay from './screens/HowToPlay';
import Settings from './screens/Settings';
// import SQLite from 'react-native-sqlite-storage';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


// const db = SQLite.openDatabase({ name: 't8.db', location: 'default' });

// function initializeDatabase() {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS game_stats (' +
//         'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
//         'games_played INTEGER,' +
//         'games_won INTEGER,' +
//         'games_lost INTEGER,' +
//         'games_tied INTEGER,' +
//         'win_percentage REAL,' +
//         'max_win_in_a_row INTEGER,' +
//         'min_victory_time INTEGER,' +
//         'time_played INTEGER)'
//     );

//     tx.executeSql(
//       'SELECT * FROM game_stats LIMIT 1',
//       [],
//       (_, { rows }) => {
//         if (rows.length === 0) {
//           tx.executeSql(
//             'INSERT INTO game_stats (games_played, games_won, games_lost, games_tied, win_percentage, max_win_in_a_row, min_victory_time, time_played) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//             [0, 0, 0, 0, 0, 0, 0, 0]
//           );
//         }
//       },
//       (_, error) => {
//         console.error('Error checking database:', error);
//       }
//     );
//   });
// }

// initializeDatabase();


function App(): JSX.Element {
  const [hideSplashScreen, setHideSplashScreen] = useState(true);

  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator initialRouteName="Logo">
          <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="TwoPlayer2" component={TwoPlayer2} options={{ headerShown: false }} />
          <Stack.Screen name="OnePlayer2" component={OnePlayer2} options={{ headerShown: false }} />
          <Stack.Screen name="Stats" component={Stats} options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          
        </Stack.Navigator>
      ) : (
        <Logo />
      )}
    </NavigationContainer>
  );




}

export default App;
