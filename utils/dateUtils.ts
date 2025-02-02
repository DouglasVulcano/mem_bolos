import { WeekPeriod } from "@/types/Chart";

export const formatDateToTwoDigits = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
};

export const generateWeeklyPeriods = (numberOfWeeks = 4): WeekPeriod[] => {
  const now = new Date();
  const startDate = new Date(
    now.getTime() - numberOfWeeks * 7 * 24 * 60 * 60 * 1000
  );

  return Array.from({ length: numberOfWeeks }, (_, i) => {
    const weekStartDate = new Date(
      startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000
    );
    const weekEndDate = new Date(
      weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    return {
      startDate: weekStartDate,
      endDate: weekEndDate,
      label: `${formatDateToTwoDigits(weekStartDate)} - ${formatDateToTwoDigits(
        weekEndDate
      )}`,
    };
  });
};
