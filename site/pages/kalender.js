import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'


const Kalender = () => <FullCalendar
    buttonText={{
        today: 'Heute',
        day: 'Tag',
        week: 'Woche',
        month: 'Monat'
    }}
    aspectRatio="0.2"
    hiddenDays={[2, 4, 0]}
    locale='de'
    plugins={[dayGridPlugin, rrulePlugin, iCalendarPlugin]}
    initialView="dayGridMonth"
    eventSources={[{
        url: '/bettv.ics',
        format: 'ics'
    }, {
        url: '/google.ics',
        format: 'ics'
    }]}
/>

export default Kalender;
