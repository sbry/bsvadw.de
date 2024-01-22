// import './components/Cms.scss';
import IcalExpander from 'ical-expander';

const getIcalExpander = (calendarString, dateStart, dateEnd) => {
    const icalExpander = new IcalExpander({ics: calendarString, maxIterations: null});
    return icalExpander.between(dateStart, dateEnd);
}

// const concatExpanders = (...icalExpanders) => {
//     let allEvents = [];
//     icalExpanders.forEach((expander) => {
//         const mappedEvents = expander.events.map(e => ({startDate: e.startDate, summary: e.summary}));
//         const mappedOccurrences = expander.occurrences.map(o => ({startDate: o.startDate, summary: o.item.summary}));
//         allEvents.push(mappedEvents, mappedOccurrences);
//     });
//     return allEvents;
// }
// const allEvents = concatExpanders(perleServiceIcalExpander, ptadZonesIcalExpander)
// console.log(allEvents)
// console.log(allEvents.map(e => `${e.startDate.toJSDate().toISOString()} - ${e.summary}`).join('\n'));

const getDayEvents = (day, events) => {
    const dayjs_date = dayjs(day);
    return events.filter((event) => {
        if (dayjs_date.isBetween(dayjs(event.startDate.toJSDate()), dayjs(event.endDate.toJSDate()), 'day', '[]')) {
            return event;
        }
    });
}

/*
 * build the calendar
 */
import dayjs from "dayjs";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);


const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;

const daysOfWeekElement = document.getElementById("days-of-week");

WEEKDAYS.forEach((weekday) => {
    const weekDayElement = document.createElement("li");
    daysOfWeekElement.appendChild(weekDayElement);
    weekDayElement.innerText = weekday;
});


export function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH, ics_sources = []) {

    let allEvents = [].concat(ics_sources.map(ics_source => getIcalExpander(ics_source, new Date(year, 1, 1), new Date(year, 12, 31))).map(
        events => icalExpander.events.concat(icalExpander.occurrences)
    ))


    const calendarDaysElement = document.getElementById("calendar-days");

    document.getElementById("selected-month").innerText = dayjs(
        new Date(year, month - 1)
    ).format("MMMM YYYY");

    removeAllDayElements(calendarDaysElement);

    currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    );

    previousMonthDays = createDaysForPreviousMonth(year, month);

    nextMonthDays = createDaysForNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

    days.forEach((day) => {
        appendDay(day, calendarDaysElement, getDayEvents(day.date, allEvents));
    });
}

function appendDay(day, calendarDaysElement, dayEvents) {
    const dayElement = document.createElement("li");
    const dayElementClassList = dayElement.classList;
    dayElementClassList.add("calendar-day");
    const dayOfMonthElement = document.createElement("span");
    dayOfMonthElement.innerText = day.dayOfMonth;
    dayElement.appendChild(dayOfMonthElement);


    if (!day.isCurrentMonth) {
        dayElementClassList.add("calendar-day--not-current");
    }

    if (day.date === TODAY) {
        dayElementClassList.add("calendar-day--today");
    }

    // perleServiceIcalExpander.events
    // perleServiceIcalExpander.occurrences
    // ptadZonesIcalExpander.events
    // ptadZonesIcalExpander.occurrences


    if (dayEvents) {
        const ol = document.createElement("ol");
        dayEvents.forEach((event) => {
            const li = document.createElement('li')
            // ${event.startDate.toJSDate().toLocaleTimeString()}
            li.innerText = `${event.summary}`;
            ol.appendChild(li)
        });
        dayElement.appendChild(ol);
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

function createDaysForPreviousMonth(year, month) {
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

function createDaysForNextMonth(year, month) {
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

export function initMonthSelectors() {
    document
        .getElementById("previous-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).subtract(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });

    document
        .getElementById("present-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });

    document
        .getElementById("next-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).add(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });
}

