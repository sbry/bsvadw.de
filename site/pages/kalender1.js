import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import iCalendarPlugin from '@fullcalendar/icalendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, {useEffect, useRef} from "react";

const Kalender1 = () => {
    /*
     * reload on refocus so people dont call me...
     *
     * 25 years, people still dont reload, actually less than ever
     */
    const calendarRef = useRef(null)

    useEffect(() => {
        const onFocus = () => {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.refetchEvents()
        }

        window.addEventListener("focus", onFocus);

        return () => window.removeEventListener("focus", onFocus);
    });

    return <div><h1 style={{position: "absolute", right: 0, backgroundColor: '#fde420'}}>Halle 1</h1><FullCalendar
        ref={calendarRef}
        moreLinkClassNames={({num, text}) => {
            var map = {1: "one-third", 2: "two-thirds", 3: "full"}
            return [map[num]];
        }}
        moreLinkContent={({num, text}) => {
            return `${num}`
        }}
        views={
            {
                dayGridMonthMore: {
                    type: 'dayGridMonth',
                    dayMaxEventRows: 0,
                }
            }
        }
        dayMaxEventRows={true}
        buttonText={{
            today: 'Heute',
            day: 'Tag',
            week: 'Woche',
            month: 'Monat'
        }}
        weekNumbers={true}
        dayHeaders={true}
        hiddenDays={[2, 4, 0]}
        locale='de'
        plugins={[rrulePlugin, iCalendarPlugin, dayGridPlugin]}
        initialView="dayGridMonthMore"
        eventSources={[

            {
                url: '/bettv.ics',
                format: 'ics',
                color: 'red',   // an option!
            },

            // {
            //     url: '/google.ics',
            //     format: 'ics',
            //     color: 'blue',   // an option!
            //
            // }

        ]}
    /></div>
}
export default Kalender1;
