import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image, Animated, Easing } from "react-native";
import { postChat } from "../apis/apis";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/theme";

const CounsellingScreen = ({ navigation }) => {
  const [userMessages, setUserMessages] = useState([]);
  const [assistantMessages, setAssistantMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [userMessages, assistantMessages]);

  useEffect(() => {
    startSpinnerAnimation();
  }, [isLoading]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const appendUserMessage = (message) => {
    setUserMessages([...userMessages, message]);
  };

  const appendBotMessage = (message) => {
    setAssistantMessages([...assistantMessages, message]);
  };

  const getCounselling = async () => {
    if (inputText.trim() === "") {
      return;
    }
    await appendUserMessage(inputText);
    setIsLoading(true);

    try {
      const data = await postChat([...userMessages, inputText], assistantMessages);
      appendBotMessage(data.assistant);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setInputText("");
  };

  // TODO: 리팩터링
  const renderMessages = () => {
    const renderedMessages = [];
    const maxLength = Math.max(userMessages.length, assistantMessages.length);

    for (let i = 0; i < maxLength; i++) {
      if (userMessages[i]) {
        renderedMessages.push(
          <View key={`user_${i}`} style={[styles.chatMessage, styles.userMessage]}>
            <Text style={[styles.point, styles.chat]}>{userMessages[i]}</Text>
          </View>
        );
      }

      if (assistantMessages[i]) {
        renderedMessages.push(
          <View key={`assistant_${i}`} style={[styles.chatMessage, styles.botMessage]}>
            <Text style={[styles.point, styles.chat]}>{assistantMessages[i]}</Text>
          </View>
        );
      }
    }

    return renderedMessages;
  };

  const spinValue = new Animated.Value(0);

  const startSpinnerAnimation = () => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image style={styles.logo} source={require("../assets/mood/happy.png")} />
        </Pressable>
      </View>
      <View style={styles.chatWindow}>
        <ScrollView contentContainerStyle={styles.chatBox} ref={scrollViewRef} onContentSizeChange={scrollToBottom}>
          <View style={[styles.chatMessage, styles.botMessage]}>
            <Text style={[styles.point, styles.chat]}>안녕하세요, 저는 행복이예요. 고민이 있으면 들어줄게요.</Text>
          </View>
          {renderMessages()}
        </ScrollView>
        {isLoading && (
          <View style={styles.spinnerContainer}>
            <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
              <AntDesign name="loading1" size={48} color={colors.GRAY_500} />
            </Animated.View>
          </View>
        )}
      </View>
      <View style={styles.chatInput}>
        <TextInput style={[styles.userInput, styles.point]} placeholder="무엇이든 말해보세요" value={inputText} onChangeText={(text) => setInputText(text)} />
        <Pressable style={styles.inputButton} onPress={getCounselling}>
          <Text style={styles.point}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 44,
  },
  header: {
    flex: 1,
    overflow: "unset",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  point: {
    fontFamily: "point",
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  chatWindow: {
    flex: 8,
    maxWidth: 600,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  userInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  inputButton: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#f2f9ec",
    color: "#222222",
  },
  chat: {
    fontSize: 16,
  },
  spinner: {
    width: 48,
    height: 48,
  },
  spinnerContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default CounsellingScreen;
