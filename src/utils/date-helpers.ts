/**
 * Date utility functions
 */
export const getDateRange = (period: string) => {
  const today = new Date();

  const formatDateLocal = (date: Date) =>
    date.toLocaleDateString("en-CA");

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1)

  switch (period) {
    case "Yesterday": {
      return {
        start_date: formatDateLocal(yesterday),
        end_date: formatDateLocal(yesterday),
      };
    }

    case "This Week": {
      // Monday is the first day of the week
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - daysFromMonday);

      return {
        start_date: formatDateLocal(weekStart),
        end_date: formatDateLocal(yesterday),
      };
    }

    case "This Month": {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        start_date: formatDateLocal(monthStart),
        end_date: formatDateLocal(yesterday),
      };
    }

    case "This Year": {
      const yearStart = new Date(today.getFullYear(), 0, 1);
      return {
        start_date: formatDateLocal(yearStart),
        end_date: formatDateLocal(yesterday),
      };
    }

    default: {
      return {
        start_date: formatDateLocal(yesterday),
        end_date: formatDateLocal(yesterday),
      };
    }
  }
};

export const formatDateISO = (date: Date) => date.toISOString().split("T")[0]

export const formatDatePretty = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}







// export const getDateRangeFromGroupBy = (
//   period: string,
//   startDate?: string,
//   endDate?: string
// ) => {
//   if (startDate && endDate) {
//     return { start_date: startDate, end_date: endDate };
//   }

//   switch (period) {
//     case "Date":
//       return getDateRange("Today");
//     case "Week":
//       return getDateRange("This Week");
//     case "Month":
//       return getDateRange("This Month");
//     case "Year":
//       return getDateRange("This Year");
//     default:
//       return getDateRange("This Month");
//   }
// };


export const getDateRangeFromGroupBy = (
  period: string,
  startDate?: string,
  endDate?: string
) => {
  if (startDate || endDate) {
    return {
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    }
  }

  return null
}



export const getApiGroupBy = (period: string): string => {
  switch (period) {
    case "Date":
      return "today";
    case "Week":
      return "week";
    case "Month":
      return "month";
    case "Year":
      return "year";
    default:
      return "week";
  }
};




export const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};