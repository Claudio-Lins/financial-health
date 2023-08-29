"use client";

import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DayCard } from "./DayCard";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
dayjs.extend(weekOfYear);

export function CurrentWeek() {
  const [currentDate, setCureentDate] = useState(() => {
    return dayjs();
  });

  const [weekNumber, setWeekNumber] = useState(() => {
    return currentDate.week();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    return currentDate.format("MMMM");
  });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCureentDate(previousMonthDate);
  }
  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCureentDate(nextMonthDate);
  }

  function handlePreviousWeek() {
    const previousWeekNumber = weekNumber - 1;
    setWeekNumber(previousWeekNumber);
  }

  function handleNextWeek() {
    const nextWeekNumber = weekNumber + 1;
    setWeekNumber(nextWeekNumber);
  }

  //   const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const calendarWeeksofYear = useMemo(() => {
    const firstDayOfYear = currentDate.startOf("year");
    const firstDayOfCalendar = firstDayOfYear.startOf("week");
    const lastDayOfYear = currentDate.endOf("year");
    const lastDayOfCalendar = lastDayOfYear.endOf("week");
    const calendar = [];
    let currentDay = firstDayOfCalendar;
    while (currentDay.isBefore(lastDayOfCalendar)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDay);
        currentDay = currentDay.add(1, "day");
      }
      calendar.push(week);
    }
    return calendar;
  }, [currentDate]);

  useEffect(() => {
    setCurrentMonth(calendarWeeksofYear[weekNumber][0].format("MMMM"));
    if (weekNumber === 52) setWeekNumber(0);
    if (weekNumber === -1) setWeekNumber(51);
  }, [calendarWeeksofYear, currentDate, weekNumber]);

  //   console.log(calendarWeeksofYear[34][0].format("MMMM"));
  return (
    <div className="flex flex-col space-y-4 items-center mt-4">
      <div className="flex items-center justify-between gap-2 w-56">
        <button className="" onClick={handlePreviousMonth}>
          <ChevronLeft className="w-8 h-8 hover:text-zinc-800 text-zinc-50" />
        </button>
        <div className=" ">
          <span className="capitalize font-semibold text-xl text-zinc-100">
            {currentMonth}
          </span>
          <span className="text-zinc-600"> {currentYear}</span>
        </div>
        <button onClick={handleNextMonth}>
          <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-50" />
        </button>
      </div>
      <div className="flex md:flex-row items-center justify-center gap-2 md:gap-6">
        {calendarWeeksofYear[weekNumber].map((week, index) => {
          return (
            <DayCard
              key={index}
              active={
                week.isSame(dayjs(), "day") &&
                week.isSame(dayjs(), "month") &&
                week.isSame(dayjs(), "year")
              }
              day={week.format("DD")}
              weekDay={week.format("ddd")}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-4">
        <button className="" onClick={handlePreviousWeek}>
          <ChevronLeft className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
        </button>
        {/* <p>{weekNumber}</p> */}
        <button onClick={handleNextWeek}>
          <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
        </button>
      </div>
    </div>
  );
}
