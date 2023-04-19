import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import colors from "../styles/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Calendar from "../components/Calendar";

function HomeScreen({ navigation }) {
  const [activeMenu, setActiveMenu] = useState("calendar");

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
      <Pressable style={styles.menubar}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.calendarIcon}
            source={require("../assets/icon/calendar.png")}
          />

          <Text
            style={[
              styles.normal,
              styles.iconText,
              activeMenu === "calendar" && styles.activeMenu,
            ]}
          >
            캘린더
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Image
            style={styles.happyGardenIcon}
            source={require("../assets/icon/happy-garden.png")}
          />
          <Text
            style={[
              styles.normal,
              styles.iconText,
              activeMenu === "happyGarden" && styles.activeMenu,
            ]}
          >
            행복정원
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons name="settings-sharp" size={30} color={colors.PRIMARY_50} />
          <Text
            style={[
              styles.normal,
              styles.iconText,
              activeMenu === "setting" && styles.activeMenu,
            ]}
          >
            설정
          </Text>
        </View>
      </Pressable>
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

  menubar: {
    flex: 1.8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  calendarIcon: {
    width: 30,
    height: 30,
  },

  happyGardenIcon: {
    width: 35,
    height: 35,
  },

  iconContainer: {
    alignItems: "center",
  },

  activeMenu: {
    color: colors.PRIMARY_800,
  },

  iconText: {
    color: colors.PRIMARY_50,
  },
});

export default HomeScreen;
