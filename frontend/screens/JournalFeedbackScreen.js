import { useContext } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";
import { JournalContext } from "../contexts/JournalContext";
import moment from "moment";
import { postJournal, updateJournal } from "../apis/apis";

function JournalFeedbackScreen({ navigation, route }) {
  const { counsellingAnswer, resetJournalContext, journalState } = useContext(JournalContext);
  const currentDate = moment();
  const date = currentDate.format("YYYY-MM-DD"); //TODO: 따로 빼기 (context해서 어디서든 사용가능하게)
  moment.lang("ko", {
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
  });

  const handleCompletedTodayJournal = () => {
    navigation.navigate("Home");
    // 데이터베이스에 일기 내용 저장
    postJournal({ ...journalState(), date });

    // state 리셋
    resetJournalContext();
  };

  const handleCompletedUpdateJournal = () => {
    updateJournal({ ...journalState(), date: route.params.todoUpdateDate });

    // state 리셋
    resetJournalContext();

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("ThanksJournal")}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
          <Text style={[styles.point, styles.date]}>{route.params ? moment(route.params.todoUpdateDate).format("YYYY년 M월 DD일 (dddd)") : currentDate.format("YYYY년 M월 DD일 (dddd)")}</Text>
        </View>

        <View style={styles.journalFeedbackSection}>
          <Image style={styles.happyImage} source={require("../assets/mood/happy.png")} />
          <Text style={[styles.topText, styles.point]}>오늘 하루도 수고하셨어요, 예지님 :)</Text>
          <Text style={[styles.bottomText, styles.normal]}>{counsellingAnswer}</Text>
          <Pressable style={styles.homeButton} onPress={route.params ? handleCompletedUpdateJournal : handleCompletedTodayJournal}>
            <Text style={[styles.homeButtonText, styles.point]}>메인으로</Text>
          </Pressable>
        </View>
      </View>
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

  journalFeedbackSection: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  topText: {
    textAlign: "center",
  },
  bottomText: {
    textAlign: "center",
    width: "70%",
  },

  happyImage: {
    width: 150,
    height: 150,
  },

  homeButton: {
    backgroundColor: colors.PRIMARY_100,
    width: "50%",
    borderRadius: 32,
    paddingVertical: 20,
    alignItems: "center",
  },

  homeButtonText: {
    color: colors.WHITE,
  },
});

export default JournalFeedbackScreen;
