import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MoodJournalScreen from "./screens/MoodJournalScreen";
import ThanksJournalScreen from "./screens/ThanksJournalScreen";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading"; //TODO: deprecated. expo-splash-screen 사용해서 변경하기

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      normal: require("./assets/fonts/gangwon.otf"),
      point: require("./assets/fonts/UhBeeZZIBA-Regular.ttf"),
    });
  };

  return isReady ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ThanksJournal"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodJournal" component={MoodJournalScreen} />
        <Stack.Screen name="ThanksJournal" component={ThanksJournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
    />
  );
}
