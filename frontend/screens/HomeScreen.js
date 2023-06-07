import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/theme";
import Calendar from "../components/Calendar";
import Menubar from "../components/Menubar";
import { getJournal } from "../apis/apis";
import moment from "moment";
import CustomModal from "../components/CustomModal";
import { useIsFocused } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rerender, setRerender] = useState(0);
  const isFocused = useIsFocused();

  // TODO: cud를 한 후에 home화면으로 돌아올 때, home화면을 리렌더링 해야한다.
  // cud 를 한 후, home 화면으로 navigation을 한다.
  // navigation -> 인지? (useIsFocused)
  // home 화면 컴포넌트 내의 상태값이 변경된다.
  // home 화면이 리렌더링 된다.
  useEffect(() => {
    if (isFocused) {
      setRerender(rerender + 1);
    }
  }, [isFocused]);

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

  const navigateJournalRecordScreen = (clickedJournalData) => {
    // TODO: 백단에서 모두 JSON.parse 된 결과값을 리턴하도록 수정?
    navigation.navigate("JournalRecord", JSON.parse(clickedJournalData));
  };

  const navigateScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Calendar onPressDate={navigateJournalRecordScreen} rerender={rerender} />
        <Pressable style={styles.writeJournalButton} onPress={handleWriteJournalButton}>
          <FontAwesome5 name="pen" size={25} color={colors.WHITE} />
        </Pressable>
      </View>

      {/* TODO: 컴포넌트 분리, 행복정원, 설정에서도 가져갈 수 있도록 */}
      <Menubar onPressMenu={navigateScreen} />

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
