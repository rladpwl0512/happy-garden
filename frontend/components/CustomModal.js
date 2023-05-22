import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/theme";

const CustomModal = ({ visible, onClose, width = 300, height = 300, children }) => {
  const [blurAmount, setBlurAmount] = useState(10);

  return (
    <Modal visible={visible} transparent>
      <BlurView intensity={blurAmount} style={styles.absolute} onPress={() => onClose()}>
        <TouchableOpacity style={styles.absolute} />
      </BlurView>
      <View style={styles.container}>
        <View style={[styles.modal]}>
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Ionicons name="close-outline" size={28} color={colors.GRAY_500} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: colors.PRIMARY_50,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
  },
});

export default CustomModal;
