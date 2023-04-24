import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/theme";
import Calendar from "../components/Calendar";
import Menubar from "../components/Menubar";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Calendar />
        <Pressable
          style={styles.writeJournalButton}
          onPress={() => navigation.navigate("MoodJournal")}
        >
          <FontAwesome5 name="pen" size={25} color={colors.WHITE} />
        </Pressable>
      </View>

      {/* TODO: 컴포넌트 분리, 행복정원, 설정에서도 가져갈 수 있도록 */}
      <Menubar />
    </View>
  );
}

const styles = StyleSheet.create({
  normal: {
    fontFamily: "normal",
  },

  point: {
    fontFamily: "point",
  },

  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: colors.WHITE,
  },

  content: {
    flex: 9,
    marginHorizontal: 24,
  },

  writeJournalButton: {
    position: "absolute",
    right: 0,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY_100,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
});

export default HomeScreen;
