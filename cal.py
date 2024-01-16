#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/cal.py
# Author:   Justin Salisbury justin@sinube
# Created:  Tue Jan 16 16:23:57 2024
#

import ics, requests, calendar, datetime
from itertools import chain

class EventAggregate:
    def __init__(self, bettv_url, google_url):
        self.google_cal = ics.Calendar(requests.get(google_url).text)
        self.bettv_cal = ics.Calendar(requests.get(bettv_url).text)

    def __iter__(self):
        return chain(self.bettv_cal.events,
                     self.google_cal.events)


##
#
class EmployeeScheduleCalendar(calendar.LocaleHTMLCalendar):
    events = {}

    def add_event(self):
        pass
    def formatday(self, day, weekday):
        """
          Return a day as a table cell.
        """
        if day == 0:
            return '<td class="noday">&nbsp;</td>'  # day outside month
        else:
            return '<td class="%s"><a href="%s">%d</a></td>' % (
                self.cssclasses[weekday],
                weekday,
                day)


if __name__ == '__main__':
    bettv_url = "https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=***REMOVED***&Runde=2&Hallenplan=True"
    google_url = "https://calendar.google.com/calendar/ical/***REMOVED***%40group.calendar.google.com/public/basic.ics"
    event_aggregate = EventAggregate(
        bettv_url, google_url
    )


    print(google_cal.events)
    now = datetime.datetime.now()
    bsvadw_calendar = calendar.LocaleHTMLCalendar(calendar.MONDAY, 'de_DE')

    ausgabe = kalenderblatt.formatmonth(now.year, now.month)
    print(ausgabe)
    calendar.LocaleHTMLCalendar
    pass
