import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";
import CustomModal from "../components/CustomModal";

function JournalRecordScreen({ navigation }) {
  const [thanks, setThanks] = useState(["a", "b", "c", "d", "e"]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteModal = () => {
    setIsModalVisible(true);
    console.log("보여준다");
  };
  const closeDeleteModal = () => {
    setIsModalVisible(false);
    console.log("닫는다.");
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

        <ScrollView>
          <View style={styles.journalsSection}>
            <View style={styles.moodJournalSection}>
              <Text style={[styles.normal, styles.sectionTitle]}>
                예지님이 이날 느낀 감정이예요.
              </Text>
              <View style={styles.moods}>
                <View style={styles.moodRow}>
                  <View style={styles.moodButton}>
                    <Image
                      style={[styles.moodImage]}
                      source={require("../assets/mood/happy.png")}
                    />
                  </View>
                  <View style={styles.moodButton}>
                    <Image
                      style={[styles.moodImage]}
                      source={require("../assets/mood/normal.png")}
                    />
                  </View>
                  <View style={styles.moodButton}>
                    <Image
                      style={[styles.moodImage]}
                      source={require("../assets/mood/angry.png")}
                    />
                  </View>
                  <View style={styles.moodButton}>
                    <Image
                      style={[styles.moodImage]}
                      source={require("../assets/mood/sad.png")}
                    />
                  </View>
                  <View style={styles.moodButton}>
                    <Image
                      style={[styles.moodImage]}
                      source={require("../assets/mood/tired.png")}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.writingJournalSection}>
              <Text style={[styles.normal, styles.sectionTitle]}>
                예지님의 하루 기록이예요.
              </Text>
              <TextInput
                editable={false}
                style={[styles.writingJournalInput, styles.normal]}
                multiline
                placeholder="오늘 하루 어떻게 지냈어요?"
              >
                오늘은 자신감이 떨어지는 하루였다. 그런데 맛있는걸 먹어서 기분이
                좋다! 히히 친구가 맛있는 치킨을 사줬다. 역시 내 친구가 짱이다.
              </TextInput>
            </View>

            {/* TODO: key를 idx로 사용하는 것이 괜찮은가 */}
            <View style={styles.thanksJournalSection}>
              <Text style={[styles.normal, styles.sectionTitle]}>
                예지님의 5번의 행복을 느낀 날이예요.
              </Text>
              {thanks.map((value, idx) => (
                <View style={styles.thanksItemContainer} key={idx}>
                  <Image
                    style={styles.happyImage}
                    source={require("../assets/mood/happy.png")}
                  />
                  <TextInput
                    editable={false}
                    style={[styles.thanksItemInput, styles.normal]}
                    placeholder="행복했던 일을 기록해보세요"
                    value={value}
                  />
                </View>
              ))}
            </View>

            <View style={styles.journalFeedbackSection}>
              <Text style={[styles.normal, styles.sectionTitle]}>
                일기에 대한 행복이의 답변이예요.
              </Text>
              <View style={styles.journalFeedbackSectionContainer}>
                <Image
                  source={require("../assets/mood/happy.png")}
                  style={styles.happyImage}
                />
                <View style={styles.journalFeedbackContainer}>
                  <Text style={(styles.journalFeedbackText, styles.normal)}>
                    test
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <CustomModal visible={isModalVisible} onClose={closeDeleteModal}>
          <Image
            style={[styles.modalImage]}
            source={require("../assets/mood/tired.png")}
          />
          <View style={styles.modalText}>
            <Text style={styles.modalTitle}>정말 삭제하실거예요?</Text>
            <Text style={styles.modalContent}>
              삭제하시면 다시 복구할 수 없어요. 신중하게 선택해주세요!
            </Text>
          </View>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.grayButton]}
              onPress={closeDeleteModal}
            >
              <Text style={[styles.buttonText, styles.point]}>취소</Text>
            </Pressable>

            <Pressable style={[styles.modalButton, styles.greenButton]}>
              <Text style={[styles.buttonText, styles.point]}>삭제</Text>
            </Pressable>
          </View>
        </CustomModal>
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, styles.grayButton]}
          onPress={showDeleteModal}
        >
          <Text style={[styles.buttonText, styles.point]}>삭제하기</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.greenButton]}>
          <Text style={[styles.buttonText, styles.point]}>수정하기</Text>
        </Pressable>
      </View>
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
    flex: 1,
    gap: 50,
  },

  grayText: {
    color: colors.GRAY_500,
  },

  buttonText: {
    color: colors.WHITE,
  },

  moodJournalSection: {
    flex: 2,
  },

  // TODO: 모든 section 같은 style(확장성 고려해서 지금처럼 다 따로 빼기? )
  thanksJournalSection: {
    flex: 2,
  },

  journalFeedbackSection: {
    flex: 2,
  },

  moods: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  writingJournalSection: {
    flex: 2,
  },

  writingJournalInput: {
    flex: 1,
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 16,
    padding: 20,
    paddingTop: 20, //TODO: 패딩에 top이 안먹음. 다시 보기
  },

  blur: {
    opacity: 0.5,
  },

  thanksItemInput: {
    backgroundColor: colors.PRIMARY_50,
  },

  thanksItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 24,
    padding: 5,
    marginTop: 10,
  },

  journalFeedbackContainer: {
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 24,
    padding: 20,
    flex: 1,
  },

  journalFeedbackText: {},

  journalFeedbackSectionContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },

  // TODO: input 안에서 자동으로 채워지도록 설정하기 (지금처럼 고정 이미지 크기 x)
  happyImage: {
    width: 70,
    height: 70,
    marginRight: 20,
  },

  buttons: {
    flex: 1.5,
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  grayButton: {
    backgroundColor: colors.GRAY_300,
  },

  greenButton: {
    backgroundColor: colors.PRIMARY_100,
  },

  sectionTitle: {
    marginBottom: 24,
  },

  modalTitle: {
    fontFamily: "point",
    fontSize: 20,
    textAlign: "center",
  },

  modalContent: {
    fontFamily: "normal",
    fontSize: 20,
    textAlign: "center",
  },

  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 20,
    borderRadius: 20,
  },

  modalImage: {
    width: 100,
    height: 100,
  },
});

export default JournalRecordScreen;
