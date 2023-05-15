import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";
import { postCounselling } from "../apis/apis";

function MoodJournalScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [journalText, setJournalText] = useState("");

  const handleSelectedMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleCompleteMoodJournal = () => {
    navigation.navigate("ThanksJournal");
    postCounselling(journalText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* TODO: 정렬 */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
          <Text style={[styles.point, styles.date]}>2023년 3월 15일 (수)</Text>
        </View>

        <View style={styles.journalsSection}>
          <View style={styles.moodJournalSection}>
            <Text style={[styles.grayText, styles.normal]}>안녕하세요 예지님,</Text>
            <Text style={styles.normal}>오늘 하루 어땠어요?</Text>

            <View style={styles.moods}>
              <View style={styles.moodRow}>
                <Pressable style={styles.moodButton} onPress={() => handleSelectedMood("happy")}>
                  <Image style={[styles.moodImage, selectedMood !== "happy" && styles.blur]} source={require("../assets/mood/happy.png")} />
                </Pressable>
                <Pressable style={styles.moodButton} onPress={() => handleSelectedMood("normal")}>
                  <Image style={[styles.moodImage, selectedMood !== "normal" && styles.blur]} source={require("../assets/mood/normal.png")} />
                </Pressable>
                <Pressable style={styles.moodButton} onPress={() => handleSelectedMood("angry")}>
                  <Image style={[styles.moodImage, selectedMood !== "angry" && styles.blur]} source={require("../assets/mood/angry.png")} />
                </Pressable>
                <Pressable style={styles.moodButton} onPress={() => handleSelectedMood("sad")}>
                  <Image style={[styles.moodImage, selectedMood !== "sad" && styles.blur]} source={require("../assets/mood/sad.png")} />
                </Pressable>
                <Pressable style={styles.moodButton} onPress={() => handleSelectedMood("tired")}>
                  <Image style={[styles.moodImage, selectedMood !== "tired" && styles.blur]} source={require("../assets/mood/tired.png")} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.writingJournalSection}>
            <Text style={[styles.normal, styles.writingJournalTitle]}>예지님의 하루를 기록해보세요</Text>
            <TextInput value={journalText} onChangeText={(text) => setJournalText(text)} style={[styles.writingJournalInput, styles.normal]} multiline placeholder="오늘 하루 어떻게 지냈어요?"></TextInput>
          </View>
        </View>
      </View>

      <Pressable style={styles.nextButton} onPress={handleCompleteMoodJournal}>
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
    paddingTop: 44,
    backgroundColor: colors.WHITE,
  },

  content: {
    flex: 9,
    marginHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },

  date: {
    textAlign: "center",
    flex: 1,
  },

  journalsSection: {
    flex: 10,
  },

  grayText: {
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

  moodJournalSection: {
    flex: 3,
  },

  moods: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 24,
  },

  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  moodButton: {
    flex: 1,
  },

  moodImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },

  writingJournalTitle: {
    marginTop: 20,
  },

  writingJournalSection: {
    flex: 7,
  },

  writingJournalInput: {
    flex: 1,
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 16,
    padding: 20,
    paddingTop: 20, //TODO: 패딩에 top이 안먹음. 다시 보기
    marginVertical: 24,
  },

  blur: {
    opacity: 0.5,
  },
});

export default MoodJournalScreen;
