import React from "react";
import { Text, View, StyleSheet, Image, Pressable, ScrollView, TextInput, Button } from "react-native";
import colors from "../styles/theme";
import { EvilIcons } from "@expo/vector-icons";

function CounsellingScreen({ navigation }) {
  const getCounselling = async () => {
    const message = userInput.value;
    if (message.trim() === "") {
      return;
    }

    appendUserMessage(message);
    userInput.value = "";

    showSpinner();
    disableInput();

    try {
      const response = await fetch("https://fnoylcxnh7.execute-api.us-east-1.amazonaws.com/prod/counselling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessages, assistantMessages }),
      });
      const data = await response.json();
      assistantMessages.push(data.assistant);
      appendBotMessage(data.assistant);
    } catch (error) {
      console.error(error);
    } finally {
      hideSpinner();
      activeInput();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image style={styles.logo} source={require("../assets/mood/happy.png")} />
        </Pressable>
      </View>
      <View style={styles.chatContainer}>
        <ScrollView contentContainerStyle={styles.chatBox}>
          <View style={[styles.chatMessage, styles.botMessage]}>
            <Text>안녕하세요, 저는 행복이예요. 고민이 있으면 들어줄게요.</Text>
            <EvilIcons name="spinner-2" size={30} color="black" />
          </View>
        </ScrollView>
        <View style={styles.chatInput}>
          <TextInput style={styles.input} placeholder="무엇이든 말해보세요" />
          <Button title="확인" onPress={getCounselling} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.PRIMARY_50,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontFamily: "point",
    fontSize: 30,
    color: colors.PRIMARY_600,
  },

  header: {
    overflow: "unset",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },

  logo: {
    width: 50,
    height: 50,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: "#f2f9ec",
  },
  chatBox: {
    flexGrow: 1,
    padding: 20,
  },
  chatMessage: {
    maxWidth: "70%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    wordWrap: "break-word",
  },
  userMessage: {
    backgroundColor: "#fffae1",
    color: "#222222",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#f2f9ec",
    color: "#222222",
    alignSelf: "flex-start",
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  spinner: {
    display: "none",
    margin: 10,
    padding: 10,
  },
});

export default CounsellingScreen;
