import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/theme";

function MoodJournalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Pressable
            style={styles.prevButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text style={[styles.date, styles.point]}>2023년 3월 15일 (수)</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.moodArea}>
            <Text style={[styles.grayText, styles.normal]}>
              안녕하세요 예지님,
            </Text>
            <Text style={styles.normal}>오늘 하루 어땠어요?</Text>
            <View style={styles.moods}>
              <Pressable>
                <Image
                  style={styles.moodImage}
                  source={require("../assets/mood/happy.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.moodImage}
                  source={require("../assets/mood/normal.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.moodImage}
                  source={require("../assets/mood/angry.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.moodImage}
                  source={require("../assets/mood/sad.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.moodImage}
                  source={require("../assets/mood/tired.png")}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.journalArea}>
            <Text style={[styles.normal, styles.journalTitle]}>
              예지님의 하루를 기록해보세요
            </Text>
            <TextInput
              style={[styles.journalInput, styles.normal]}
              multiline
              placeholder="오늘 하루 어떻게 지냈어요?"
            ></TextInput>
          </View>
        </View>
      </View>

      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate("ThanksJournal")}
      >
        <Text style={[styles.nextButtonText, styles.point]}>작성 완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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

  grayText: {
    fontSize: 20,
    color: colors.GRAY_500,
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

  moodArea: {
    flex: 3,
  },

  moods: {
    flexDirection: "row",
    marginVertical: 24,
    gap: 8,
    justifyContent: "space-between",
  },

  moodImage: {
    width: 70,
    height: 70,
  },

  journalTitle: {
    marginTop: 20,
  },

  journalArea: {
    flex: 7,
  },

  journalInput: {
    flex: 1,
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 16,
    padding: 20,
    paddingTop: 20, //TODO: 패딩에 top이 안먹음. 다시 보기
    marginVertical: 24,
  },
});

export default MoodJournalScreen;
