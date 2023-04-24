import React, { useState } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/theme";
import CustomModal from "./CustomModal";

// TODO: 폴더 위치
function Menubar() {
  const [activeMenu, setActiveMenu] = useState("calendar");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showNotReadyFeatureModal = () => {
    setIsModalVisible(true);
    console.log("true");
  };
  const closeNotReadyFeatureModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.menubar}>
        <Pressable style={styles.iconContainer}>
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
        </Pressable>

        <Pressable
          style={styles.iconContainer}
          onPress={showNotReadyFeatureModal}
        >
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
        </Pressable>

        <Pressable
          style={styles.iconContainer}
          onPress={showNotReadyFeatureModal}
        >
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
        </Pressable>
      </View>

      <CustomModal visible={isModalVisible} onClose={closeNotReadyFeatureModal}>
        <Image
          style={styles.notReadyIcon}
          source={require("../assets/mood/sad.png")}
        />
        <Text style={[styles.point, styles.notReadyModalText]}>
          준비중입니다.
        </Text>
      </CustomModal>
    </>
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

  notReadyIcon: {
    width: 100,
    height: 100,
  },

  notReadyModalText: {
    fontSize: 40,
  },
});

export default Menubar;
