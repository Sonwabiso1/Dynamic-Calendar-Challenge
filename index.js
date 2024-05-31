// scripts.js

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const createArray = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(i);
  }

  return result;
};

const createData = () => {
  const current = new Date();
  current.setDate(1); //set it to first day of the month
  const startDay = current.getDay(); // Day of the week where the month starts (0 = Sunday)
  console.log(startDay);
  const daysInMonth = getDaysInMonth(current); //days in the month of current month

  const weeks = createArray(5);
  const days = createArray(7);
  const result = [];

  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex + 1,
      days: [],
    });

    for (const dayIndex of days) {
      const day = dayIndex - startDay + weekIndex * 7 + 1;
      const isValid = day > 0 && day <= daysInMonth;

      result[weekIndex].days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : "",
      });
    }
  }

  return result;
};

//from the results array what do we extract for the table

const addCell = (existing, classString, value) => {
  const result = /* html */ `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

  return result;
};

const createHtml = (data) => {
  let result = "";

  for (const { week, days } of data) {
    let inner = "";
    inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);

    for (const { dayOfWeek, value } of days) {
      const today = new Date();
      const isToday =
        today.getDate() === value && today.getMonth() === new Date().getMonth();
      const isWeekend = dayOfWeek === 7 || dayOfWeek === 1; // Assuming Sunday (1) and Saturday (7) as weekends
      const isAlternate = week % 2 === 0;

      let classString = "table__cell";
      if (isToday) classString += " table__cell_today";
      if (isWeekend) classString += " table__cell_weekend";
      if (isAlternate) classString += " table__cell_alternate";

      inner = addCell(inner, classString, value || "&nbsp;");
    }

    result += `<tr>${inner}</tr>`;
  }

  return result;
};

// Only edit above

const current = new Date();
console.log(current);
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);
