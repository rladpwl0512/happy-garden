import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../styles/theme";
import { Ionicons } from "@expo/vector-icons"; // TODO: header 반복되는 부분 따로 뺄 수 있는지?

function ThanksJournalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("MoodJournal")}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text style={styles.point}>2023년 3월 15일 (수)</Text>
        </View>

        <View style={styles.content}></View>
      </View>

      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={[styles.nextButtonText, styles.point]}>작성 완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // 공통적으로 뺄 수 있는 것 뺄 수 있는가? (normal, point, container 같은 스타일들 export 해서 import 방식으로 다양한 파일에서 사용할 수 있도록)
  normal: {
    fontFamily: "normal",
    fontSize: 20,
  },

  point: {
    fontFamily: "point",
    fontSize: 20,
  },

  container: {
    flex: 1,
    marginTop: 44,
  },

  top: {
    flex: 9,
    marginHorizontal: 24,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  content: {
    flex: 10,
  },

  nextButton: {
    flex: 1.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  nextButtonText: {
    color: colors.WHITE,
  },
});

export default ThanksJournalScreen;
