import { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image, Animated, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";
import { JournalContext } from "../contexts/JournalContext";
import moment from "moment";
import "moment/locale/ko";
import { postJournal, updateJournal } from "../apis/apis";

function JournalFeedbackScreen({ navigation, route }) {
  const { counsellingAnswer, resetJournalContext, journalState } = useContext(JournalContext);
  const currentDate = moment();
  const date = currentDate.format("YYYY-MM-DD"); //TODO: 따로 빼기 (context해서 어디서든 사용가능하게)

  useEffect(() => {
    startSpinnerAnimation();
  }, []);

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

  const spinValue = new Animated.Value(0);

  const startSpinnerAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("ThanksJournal")}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
          <Text style={[styles.point, styles.date]}>{route.params ? moment(route.params.todoUpdateDate).format("YYYY년 M월 DD일 (dd)") : currentDate.format("YYYY년 M월 DD일 (dd)")}</Text>
        </View>

        <View style={styles.journalFeedbackSection}>
          <Image style={styles.happyImage} source={require("../assets/mood/happy.png")} />
          <Text style={[styles.topText, styles.point]}>오늘 하루도 수고하셨어요, 예지님 :)</Text>
          <View style={styles.contentContainer}>
            {counsellingAnswer === "" ? (
              <>
                <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                  <AntDesign name="loading1" size={48} color={colors.GRAY_500} />
                </Animated.View>
              </>
            ) : (
              <Text style={[styles.bottomText, styles.normal]}>{counsellingAnswer}</Text>
            )}
          </View>
          <Pressable style={[styles.homeButton, counsellingAnswer === "" ? styles.disabledHomeButton : styles.activeHomeButton]} onPress={route.params ? handleCompletedUpdateJournal : handleCompletedTodayJournal} disabled={counsellingAnswer === ""}>
            <Text style={[styles.homeButtonText, styles.point]}>메인으로</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // TODO: 공통적으로 뺄 수 있는 것 뺄 수 있는가? (normal)
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
    width: "100%",
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  happyImage: {
    width: 150,
    height: 150,
  },

  activeHomeButton: {
    backgroundColor: colors.PRIMARY_100,
  },

  disabledHomeButton: {
    backgroundColor: colors.GRAY_300,
  },

  homeButton: {
    width: "50%",
    borderRadius: 32,
    paddingVertical: 20,
    alignItems: "center",
  },

  homeButtonText: {
    color: colors.WHITE,
  },

  contentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },

  guideText: {
    color: colors.GRAY_500,
  },
});

export default JournalFeedbackScreen;
