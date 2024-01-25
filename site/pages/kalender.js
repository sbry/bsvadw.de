import React from 'react'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'







export default class DemoApp extends React.Component {
    render() {
        return (
            <FullCalendar
                plugins={[ dayGridPlugin, rrulePlugin, iCalendarPlugin ]}
                initialView="dayGridMonth"
                events={{
                    url: 'https://mywebsite/icalendar-feed.ics',
                    format: 'ics'
                }}
            />
        )
    }
}
