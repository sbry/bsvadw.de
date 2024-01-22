// import createCalendar from "../components/calendar";
import dayjs from "dayjs";

import {createElement, Fragment} from "react";

export default () => {
    return createElement('div', {
            'class': 'calendar-month'
        }, "test");
}

/*
        <>
            createElement('div', {
                    'class': "calendar-month-header"
                },
                <>
                    createElement('div', {
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
                    }, '>')
                </>
            ),
            createElement('div', {'class': "calendar-month-body"}, createElement('ol', {'id': 'days-of-week'}),
                WEEKDAYS.map((weekday) => {
                    return createElement("li", {}, weekday);
                }), createElement('ol', {
                    'id': 'calendar-days'
                })
            )
        </>

 */


// import {useState} from "react";
//
// const test = () => {
//
//     const calendarDaysElement = document.getElementById("calendar-days");
//     removeAllDayElements(calendarDaysElement);
//     const currentMonthDays = createDaysForCurrentMonth(
//         year,
//         month,
//         dayjs(`${year}-${month}-01`).daysInMonth()
//     );
//
//     const previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);
//
//     const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
//
//     const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
//
//     days.forEach((day) => {
//         const dayEvents = getDayEvents(day.date, allEvents);
//         appendDay(day, calendarDaysElement, dayEvents);
//     });
//
//
//     initialMonth, setMonth = useState('month');
//     initialYear, setYear = useState('year');
//     return <div className="calendar-month">
//         <section className="calendar-month-header">
//             <div onClick={(ev) => {
//                 let selectedMonth = dayjs(selectedMonth).subtract(1, "month");
//                 calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);
//             }} id="previous-month-selector">&lt;</div>
//             <div id="present-month-selector">{dayjs(
//                 new Date(year, month - 1)
//             ).format("MMMM YYYY")}</div>
//             <div onClick={(ev) => {
//                 let selectedMonth = dayjs(selectedMonth).add(1, "month");
//                 calendarBody(selectedMonth.format("YYYY"), selectedMonth.format("M"), allEvents);
//             }} id="next-month-selector">&gt;</div>
//         </section>
//
//         <ol
//             id="days-of-week"
//             className="day-of-week"
//         ></ol>
//
//         <ol
//             id="calendar-days"
//             className="days-grid"
//         ></ol>
//     </div>
// }
//
