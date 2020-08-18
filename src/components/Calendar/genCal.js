import { MONTH_NAMES } from "./config";

function genCal({language, startMonth, startYear}) {
  const nDays = (n) => n * 86400000;
  const days = [];
  
  // determine month & year
  const dt = new Date(Date.now());
  const mm = startMonth !== undefined ? startMonth : dt.getMonth();
  const year = startYear || dt.getFullYear();
  const month = MONTH_NAMES[language][mm];

  // derive zero-day from day 1 of month, year
  const zero = new Date(`${month} 1, ${year}`);
  const firstDay = zero.getDay(); // day of week
  const nextMonth = new Date(`${month + 1} 1, ${year}`);
  const lastDay = new Date(nextMonth.valueOf() - nDays(1));

  // last month ?
  const lastMonthName = MONTH_NAMES[language][mm === 0 ? 11 : mm - 1];
  for (let i = firstDay + 1; i > 1; i--) {
    const ndt = new Date(zero.valueOf() - nDays(i));
    days.push({ n: ndt.getDate(), month: lastMonthName });
  }

  // this month.
  for (let i = 0; i < lastDay.getDate(); i++) {
    days.push({ month, n: i });
  }
  // next month ?
  const nextMonthName =
    MONTH_NAMES[language][
      mm === 11 ? 0 : mm + 1
    ];
  for (let i= 0; i < days.length % 7; i++){
    days.push({month: nextMonthName, n: i })
  }

  // calendar page
  return { month, days, year }
}


export default genCal;