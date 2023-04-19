import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";

function JournalFeedbackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
          <Text style={[styles.point, styles.date]}>2023년 3월 15일 (수)</Text>
        </View>

        <View style={styles.journalFeedbackSection}>
          <Image
            style={styles.happyImage}
            source={require("../assets/mood/happy.png")}
          />
          <Text style={[styles.topText, styles.point]}>
            오늘 하루도 수고하셨어요, 예지님 :)
          </Text>
          <Text style={[styles.bottomText, styles.normal]}>
            자신감이 떨어지는 날이였군요. 스스로를 더 믿어보는건 어때요?
            예지님은 충분히 멋진 사람이예요!
          </Text>
          <Pressable
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
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
