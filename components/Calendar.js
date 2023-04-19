import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const Calendar = ({ width = "100%" }) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const renderHeader = () => {
    const monthYear = currentDate.format("YYYY년 M월");
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthYear}>{monthYear}</Text>
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
          <Text key={index} style={styles.dayOfWeek}>
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
                  <Text style={styles.date}>{date.date()}</Text>
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
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  dayOfWeek: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
    marginVertical: 10,
    flex: 1,
    textAlign: "center",
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  day: {
    width: `${100 / 7}%`,
    alignItems: "center",
    paddingVertical: 10,
  },
  date: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#F2F9EC",
  },
});

export default Calendar;
