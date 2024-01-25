import React from 'react'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'


export default class DemoApp extends React.Component {
    render() {
        return (
            <FullCalendar
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
        )
    }
}
