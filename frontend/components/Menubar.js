import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/theme";

// TODO: 폴더 위치
function Menubar() {
  const [activeMenu, setActiveMenu] = useState("calendar");

  return (
    <View style={styles.menubar}>
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
        <Ionicons name="settings-sharp" size={35} color={colors.PRIMARY_50} />
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
    width: 40,
    height: 40,
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

export default Menubar;
