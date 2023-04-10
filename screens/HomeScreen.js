import { StyleSheet, Text, View, Pressable } from "react-native";
import colors from "../styles/theme";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.writeJournalButton}
        onPress={() => navigation.navigate("MoodJournal")}
      >
        <Text>일기 작성</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  writeJournalButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
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
});

export default HomeScreen;
