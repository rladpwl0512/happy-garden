import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import colors from "../styles/theme";
import { getJournal, getJournalMood } from "../apis/apis";

function Calendar({ onPressDate, width = "100%", rerender }) {
  // 일기 데이터가 변경되었을 때(추가, 삭제) 리렌더링 해야함
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentMonthMoods, setCurrentMonthMoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const month = currentDate.month() + 1; // 현재 화면의 month

      const moods = await getJournalMood(month);
      setCurrentMonthMoods(moods);
    };

    fetchData();
  }, [currentDate, rerender]);

  const getClickedJournal = async (date) => {
    const journal = await getJournal(date);
    onPressDate(journal);
  };

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
          const targetDate = date.format("YYYY-MM-DD");
          const currentDateJournal = currentMonthMoods.find((obj) => obj.date === targetDate);
          const isCurrentMonth = date.isSame(currentDate, "month");
          return (
            <Pressable key={index} style={styles.day} onPress={() => getClickedJournal(targetDate)}>
              {isCurrentMonth && (
                <>
                  <Text style={(styles.date, styles.normal)}>{date.date()}</Text>
                  {currentDateJournal ? (
                    <>
                      {currentDateJournal.selectedMood === "angry" && <Image style={styles.moodImage} source={require("../assets/mood/angry.png")} />}
                      {currentDateJournal.selectedMood === "happy" && <Image style={styles.moodImage} source={require("../assets/mood/happy.png")} />}
                      {currentDateJournal.selectedMood === "normal" && <Image style={styles.moodImage} source={require("../assets/mood/normal.png")} />}
                      {currentDateJournal.selectedMood === "sad" && <Image style={styles.moodImage} source={require("../assets/mood/sad.png")} />}
                      {currentDateJournal.selectedMood === "tired" && <Image style={styles.moodImage} source={require("../assets/mood/tired.png")} />}
                    </>
                  ) : (
                    <View style={styles.circle} />
                  )}
                </>
              )}
            </Pressable>
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
}

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
  moodImage: {
    width: 35,
    height: 35,
  },
});

export default Calendar;
