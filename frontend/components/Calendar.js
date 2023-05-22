import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import colors from "../styles/theme";

const Calendar = ({ width = "100%" }) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const renderHeader = () => {
    const monthYear = currentDate.format("YYYY년 M월");
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.point}>{monthYear}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={[styles.dayOfWeek, styles.normal]}>
            {day}
          </Text>
        ))}
      </View>
    );
  };
  const renderDays = () => {
    const monthStart = currentDate.clone().startOf("month");
    const monthEnd = currentDate.clone().endOf("month");
    const startDate = monthStart.clone().subtract(monthStart.day(), "days");
    const endDate = monthEnd.clone().add(6 - monthEnd.day(), "days");
    const days = [];
    let day = startDate.clone();
    while (day.isSameOrBefore(endDate)) {
      days.push(day);
      day = day.clone().add(1, "days");
    }

    return (
      <View style={styles.days}>
        {days.map((date, index) => {
          const isCurrentMonth = date.isSame(currentDate, "month");
          return (
            <View key={index} style={styles.day}>
              {isCurrentMonth && (
                <>
                  <Text style={(styles.date, styles.normal)}>{date.date()}</Text>
                  <View style={styles.circle} />
                </>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "months"));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "months"));
  };

  return (
    <View style={[styles.container, { width }]}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  point: {
    fontFamily: "point",
    fontSize: 20,
  },
  normal: {
    fontFamily: "normal",
    fontSize: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: 1,
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dayOfWeek: {
    color: colors.GRAY_500,
    marginVertical: 10,
    flex: 1,
    textAlign: "center",
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  day: {
    width: `${100 / 7}%`,
    alignItems: "center",
    paddingVertical: 4,
  },
  date: {
    color: colors.BLACK,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY_50,
  },
});

export default Calendar;
