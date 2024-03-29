import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading"; //TODO: deprecated. expo-splash-screen 사용해서 변경하기
import * as Font from "expo-font";
import HomeScreen from "./screens/HomeScreen";
import MoodJournalScreen from "./screens/MoodJournalScreen";
import ThanksJournalScreen from "./screens/ThanksJournalScreen";
import JournalFeedbackScreen from "./screens/JournalFeedbackScreen";
import SplashScreen from "./screens/SplashScreen";
import CounsellingScreen from "./screens/CounsellingScreen";
import JournalRecordScreen from "./screens/JournalRecordScreen";
import { JournalProvider } from "./contexts/JournalContext";
import { MenuProvider } from "./contexts/MenuContext";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReadyFont, setIsReadyFont] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      normal: require("./assets/fonts/gangwon.otf"),
      point: require("./assets/fonts/UhBeeZZIBA-Regular.ttf"),
    });
  };

  return isReadyFont ? (
    <NavigationContainer>
      <JournalProvider>
        <MenuProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MoodJournal" component={MoodJournalScreen} />
            <Stack.Screen name="ThanksJournal" component={ThanksJournalScreen} />
            <Stack.Screen name="JournalFeedback" component={JournalFeedbackScreen} />
            <Stack.Screen name="JournalRecord" component={JournalRecordScreen} />
            <Stack.Screen name="Counselling" component={CounsellingScreen} />
          </Stack.Navigator>
        </MenuProvider>
      </JournalProvider>
    </NavigationContainer>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setIsReadyFont(true)}
      onError={() => {}} // TODO: 로딩에 에러가 났을 때, 대응 추가
    />
  );
}
