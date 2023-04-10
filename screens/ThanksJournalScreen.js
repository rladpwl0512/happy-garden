import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import colors from "../styles/theme";
import { AntDesign, Entypo } from "@expo/vector-icons"; // TODO: header 반복되는 부분 따로 뺄 수 있는지?

function ThanksJournalScreen({ navigation }) {
  const [thanks, setThanks] = useState([""]);
  console.log(thanks);

  const addThanksInput = () => {
    setThanks([...thanks, ""]);
  };

  const updateThanks = (idx, text) => {
    const newThanks = [...thanks];
    newThanks[idx] = text;
    setThanks(newThanks);
  };

  const deleteThanksItem = (idx) => {
    const newThanks = [...thanks];
    newThanks.splice(idx, 1);
    setThanks(newThanks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
          <Text style={[styles.point, styles.date]}>2023년 3월 15일 (수)</Text>
        </View>

        <View style={styles.content}>
          {/* title */}
          <View style={styles.title}>
            <Text style={styles.normal}>
              오늘 하루 있었던 감사했던 일을 기록해보세요.
            </Text>
            <Text style={[styles.grayText, styles.normal]}>
              감사했던 일, 행복했던 일 ... 모두 좋아요 :)
            </Text>
          </View>

          <Pressable onPress={addThanksInput}>
            <Text style={[styles.normal, styles.addButtonText]}>
              + 행복 추가
            </Text>
          </Pressable>

          <ScrollView
            style={styles.thanksSection}
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({ animated: true })
            }
          >
            {/* TODO: key를 idx로 사용하는 것이 괜찮은가 */}
            {thanks.map((value, idx) => (
              <View style={styles.inputSection} key={idx}>
                <Image
                  style={styles.happyImage}
                  source={require("../assets/mood/happy.png")}
                />
                <TextInput
                  style={[styles.ThanksInput, styles.normal]}
                  placeholder="행복했던 일을 기록해보세요"
                  value={value}
                  onChangeText={(text) => updateThanks(idx, text)}
                />
                {/* TODO: thanks, thanksitem? 변수명  */}
                <Pressable onPress={() => deleteThanksItem(idx)}>
                  <Entypo
                    name="minus"
                    size={20}
                    color={colors.GRAY_500}
                    style={styles.minusIcon}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate("JournalFeedback")}
      >
        <Text style={[styles.nextButtonText, styles.point]}>작성 완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // TODO: 공통적으로 뺄 수 있는 것 뺄 수 있는가? (normal, point, container 같은 스타일들 export 해서 import 방식으로 다양한 파일에서 사용할 수 있도록)
  normal: {
    fontFamily: "normal",
    fontSize: 20,
  },

  point: {
    fontFamily: "point",
    fontSize: 20,
  },

  grayText: {
    color: colors.GRAY_500,
  },

  container: {
    flex: 1,
    marginTop: 44,
  },

  top: {
    flex: 9,
    marginHorizontal: 24,
  },

  title: {
    marginBottom: 24,
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

  content: {
    flex: 10,
  },

  thanksSection: {
    marginTop: 10,
    marginBottom: 30,
  },

  addButtonText: {
    textAlign: "right",
  },

  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 24,
    padding: 5,
    marginTop: 10,
  },

  minusIcon: {
    marginRight: 10,
  },

  // TODO: input 안에서 자동으로 채워지도록 설정하기 (지금처럼 고정 이미지 크기 x)
  happyImage: {
    width: 70,
    height: 70,
  },

  ThanksInput: {
    backgroundColor: colors.PRIMARY_50,
    width: "60%", //TODO: 이 방식으로 한다면, happyimage, minusicon 모두 width를 %로?
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
