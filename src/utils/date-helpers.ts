/**
 * Date utility functions
 */
export const getDateRange = (period: string) => {
  const today = new Date()
  const formatDateISO = (date: Date) => date.toISOString().split("T")[0]

  switch (period) {
    case "Today":
      return {
        start_date: formatDateISO(today),
        end_date: formatDateISO(today),
      }
    case "This Week":
      // International standard: Monday is first day of week (1), Sunday is last (0)
      const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1 // If Sunday, it's 6 days from Monday

      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - daysFromMonday)

      return {
        start_date: formatDateISO(weekStart),
        end_date: formatDateISO(today),
      }
    case "This Month":
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      return {
        start_date: formatDateISO(monthStart),
        end_date: formatDateISO(today),
      }
    case "This Year":
      const yearStart = new Date(today.getFullYear(), 0, 1)
      return {
        start_date: formatDateISO(yearStart),
        end_date: formatDateISO(today),
      }
    default:
      return {
        start_date: formatDateISO(today),
        end_date: formatDateISO(today),
      }
  }
}

export const formatDateISO = (date: Date) => date.toISOString().split("T")[0]

export const formatDatePretty = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}




export const getGroupByFromDateRange = (dateRange: string): string => {
  switch (dateRange) {
    case "Today":
      return "today";
    case "This Week":
      return "week";
    case "This Month":
      return "month";
    case "This Year":
      return "year";
    default:
      return "month";
  }
};