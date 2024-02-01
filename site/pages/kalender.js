import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import iCalendarPlugin from '@fullcalendar/icalendar'
import dayGridPlugin from '@fullcalendar/daygrid'


const Kalender = () => <FullCalendar
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
    multiMonthMaxColumns={1}
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
    eventSources={[{
        url: '/bettv.ics',
        format: 'ics'
    }, {
        url: '/google.ics',
        format: 'ics'
    }]}
/>

export default Kalender;
