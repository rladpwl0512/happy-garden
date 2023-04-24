import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import colors from "../styles/theme";

function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/splash.gif")} />
      <Text style={styles.text}>행복정원</Text>
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
});

export default SplashScreen;
