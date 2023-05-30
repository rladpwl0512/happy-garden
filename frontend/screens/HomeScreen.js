import { useState } from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/theme";
import Calendar from "../components/Calendar";
import Menubar from "../components/Menubar";
import { getJournal, getJournalMood } from "../apis/apis";
import moment from "moment";
import CustomModal from "../components/CustomModal";

function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleWriteJournalButton = async () => {
    const date = moment().format("YYYY-MM-DD");
    const todayJournal = await getJournal(date);

    if (!todayJournal.error) {
      console.log(todayJournal);
      showModal(true);
      return;
    }

    navigation.navigate("MoodJournal");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const test = async () => {
    await getJournalMood(4);
  };

  test();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Calendar />
        <Pressable style={styles.writeJournalButton} onPress={handleWriteJournalButton}>
          <FontAwesome5 name="pen" size={25} color={colors.WHITE} />
        </Pressable>
      </View>

      {/* TODO: 컴포넌트 분리, 행복정원, 설정에서도 가져갈 수 있도록 */}
      <Menubar />

      <CustomModal visible={isModalVisible} onClose={closeModal}>
        <Image style={styles.notReadyIcon} source={require("../assets/mood/happy.png")} />
        <Text style={[styles.point, styles.notReadyModalText]}>오늘 일기를 이미 작성하셨습니다.</Text>
      </CustomModal>
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

  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: colors.WHITE,
  },

  content: {
    flex: 9,
    marginHorizontal: 24,
  },

  writeJournalButton: {
    position: "absolute",
    right: 0,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY_100,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },

  notReadyIcon: {
    width: 100,
    height: 100,
  },

  notReadyModalText: {
    fontSize: 20,
  },
});

export default HomeScreen;
