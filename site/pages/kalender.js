import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import iCalendarPlugin from '@fullcalendar/icalendar'
import multiMonthPlugin from '@fullcalendar/multimonth'

const Kalender = () => <FullCalendar
    viewDidMount={() => setTimeout(() => {
        var element = document.getElementsByClassName('fc-day-today');
        if (element.length) {
            element[0].scrollIntoView();
        }
    }, 1)}
    views={
        {
            multiMonthTwoMonth: {
                type: 'multiMonth',
                duration: {months: 3}
            }
        }
    }
    multiMonthMaxColumns={1}
    buttonText={{
        today: 'Heute',
        day: 'Tag',
        week: 'Woche',
        month: 'Monat'
    }}
    weekNumbers={true}
    dayHeaders={false}
    dayCellContent={({date, dayNumberText}) => {
        return <span>{date.toLocaleString('de-de', {weekday: 'short'})} {dayNumberText}.</span>
    }}
    hiddenDays={[2, 4, 0]}
    locale='de'
    plugins={[multiMonthPlugin, rrulePlugin, iCalendarPlugin]}
    initialView="multiMonthTwoMonth"
    eventSources={[{
        url: '/bettv.ics',
        format: 'ics'
    }, {
        url: '/google.ics',
        format: 'ics'
    }]}
/>

export default Kalender;
