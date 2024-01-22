import dayjs from "dayjs";
import {createElement} from "react";

var updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
    months: [
        "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
        "August", "September", "Oktober", "November", "Dezember"
    ]
});
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const TODAY = dayjs().format("YYYY-MM-DD");

const getDayEvents = (day, events) => {
    const dayjs_date = dayjs(day);
    return events.filter((event) => {
        if (dayjs_date.isBetween(dayjs(event.startDate.toJSDate()), dayjs(event.endDate.toJSDate()), 'day', '[]')) {
            return event;
        }
    });
}
<div onClick={(ev) => {
    let selectedMonth = dayjs(selectedMonth).subtract(1, "month");
    calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);
}} id="previous-month-selector">&lt;</div>
<div id="present-month-selector">{dayjs(
    new Date(year, month - 1)
).format("MMMM YYYY")}</div>

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH, allEvents) {
    const calendar = createElement('div', {
            'class': 'calendar-month'
        }, createElement('div', {
                'class': "calendar-month-header"
            }, createElement('div', {
                'id': "previous-month-selector",
                'onClick': (ev) => {
                    let selectedMonth = dayjs(selectedMonth).subtract(1, "month");
                    calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);
                }
            }, "<"), createElement('div', {'id': "present-month-selector"}),
            createElement('div', {
                'id': "next-month-selector",
                'onClick': (ev) => {
                    let selectedMonth = dayjs(selectedMonth).subtract(1, "month");
                    calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);
                }
            }, '>')),
        createElement('div', {'class': "calendar-month-body"}, createElement('ol', {'id': 'days-of-week'}),
            WEEKDAYS.map((weekday) => {
                return createElement("li", {}, weekday);
            }), createElement('ol', {
                'id': 'calendar-days'
            })
        )
    );


    let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));

    calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);


}

export default createCalendar;

function calendarBody(year, month, allEvents) {
    const calendarDaysElement = document.getElementById("calendar-days");

    document.getElementById("present-month-selector").innerText = dayjs(
        new Date(year, month - 1)
    ).format("MMMM YYYY");

    removeAllDayElements(calendarDaysElement);

    const currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    );

    const previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);

    const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

    days.forEach((day) => {
        const dayEvents = getDayEvents(day.date, allEvents);
        appendDay(day, calendarDaysElement, dayEvents);
    });
}


function appendDay(day, calendarDaysElement, dayEvents) {
    const dayElement = createElement("li");
    const dayElementClassList = dayElement.classList;
    dayElementClassList.add("calendar-day");
    const dayOfMonthElement = createElement("span");
    dayOfMonthElement.innerText = day.dayOfMonth;
    dayElement.appendChild(dayOfMonthElement);


    if (!day.isCurrentMonth) {
        dayElementClassList.add("calendar-day--not-current");
    }

    if (day.date === TODAY) {
        dayElementClassList.add("calendar-day--today");
    }

    // no occurrences here!

    if (dayEvents) {
        var dayEventsGroupedByZone = Object.groupBy(dayEvents, (event) => event._firstProp('location'));
        for (const short_zone_name in dayEventsGroupedByZone) {
            const kampagne_count = dayEventsGroupedByZone[short_zone_name].length;
            const details = createElement("details");
            const detailsClassList = details.classList;
            detailsClassList.add(short_zone_name);

            const summary = createElement("summary");
            summary.textContent = `${kampagne_count} x ${short_zone_name}`;
            details.appendChild(summary);

            const ol = createElement("ol");
            dayEventsGroupedByZone[short_zone_name].forEach((event) => {
                const li = createElement('li');
                const a = createElement("a");
                a.setAttribute('href', event._firstProp('url'));
                a.setAttribute('target', '_blank');
                a.innerText = `${event.summary}`;
                li.appendChild(a);
                ol.appendChild(li);
            });
            details.appendChild(ol);
            dayElement.appendChild(details);
        }
    }
    calendarDaysElement.appendChild(dayElement);

}

function removeAllDayElements(calendarDaysElement) {
    let first = calendarDaysElement.firstElementChild;

    while (first) {
        first.remove();
        first = calendarDaysElement.firstElementChild;
    }
}

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true
        };
    });
}

function createDaysForPreviousMonth(year, month, currentMonthDays) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${
                    previousMonthLastMondayDayOfMonth + index
                }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false
        };
    });
}

function createDaysForNextMonth(year, month, currentMonthDays) {
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: false
        };
    });
}

function getWeekday(date) {
    return dayjs(date).weekday();
}

