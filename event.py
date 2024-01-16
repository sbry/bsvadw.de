# -*- coding: utf-8 -*-
#
# File:     /Users/justin/workspace/bsvadw.de/event.py
# Author:   Justin Salisbury justin@moriarty.fritz.box
# Created:  Tue Jan 16 21:26:30 2024
#
import datetime
import calendar
from dateutil.relativedelta import relativedelta

# from general.string.xmlout import XmlOut
# from event.models import Event
# from django.core import urlresolvers


import xml.etree.ElementTree as ET


# the_doc = ET.Element("tag", testr="1")
# b = ET.SubElement(the_doc, 'b')
# b.text = "this element also contains text"
# etreeString = ET.tostring(the_doc, encoding='unicode')
# print(etreeString)

def events():
    return []


def events_by_day(all_events):
    events = {}
    for event in all_events:
        try:
            events[event.date_start].append(event)
        except KeyError:
            events[event.date_start] = []
            events[event.date_start].append(event)
        pass
    return events


class EventCalendar:
    """
        fat dual-use calendar:
            - sets lots of context
            - renders as string
    """

    def __init__(self, date_cursor=datetime.date.today()):
        self.date_cursor = date_cursor
        self.months = []
        month = EventCalendarMonth(self, self.date_cursor)
        self.months.append(month)

    def __str__(self):
        output = ''
        for month in self.months:
            output += str(month)
        return output

    def context(self):
        last_month = self.date_cursor + relativedelta(months=-1)
        next_month = self.date_cursor + relativedelta(months=+1)
        last_year = self.date_cursor + relativedelta(years=+1)
        next_year = self.date_cursor + relativedelta(years=-1)
        args = {
            'last_month': last_month,
            'next_month': next_month,
            'next_year': last_year,
            'last_year': next_year,
            'calendar': self,
            'events': self.get_events(),
            'date_cursor': self.date_cursor
        }
        return args


class EventCalendarMonthNavigation:

    def __init__(self, date_cursor, delta=0):
        self.date_cursor = date_cursor
        self.relativedelta = delta
        self.month = date_cursor + relativedelta(months=self.relativedelta)
        pass

    def __str__(self):
        atts = {'colspan': 2,
                'class': 'event-calendar-month-navigation'
                }
        if self.month.month == self.date_cursor.month:
            atts['class'] += ' active'
        else:
            atts['class'] += ' inactive'
        th = ET.Element("th", **atts)
        a = ET.SubElement(th, 'a', href="")
        a.text = '%s, %s' % (
            Event.get_monthname(self.month.month, short=True),
            self.month.year)
        return ET.tostring(th, encoding='unicode')


class EventCalendarMonth:
    x = XmlOut()
    week_headers = Event.get_daynames(True)

    def __init__(self, parent, date_cursor):
        self.date_cursor = date_cursor
        self.parent = parent
        range = calendar.monthrange(self.date_cursor.year, self.date_cursor.month)
        self.range = []
        self.range.append(datetime.date(self.date_cursor.year, self.date_cursor.month, 1))
        self.range.append(datetime.date(self.date_cursor.year, self.date_cursor.month, range[1]))
        # print self.range
        self.complete_week_range = []
        self.complete_week_range.append(self.range[0] - datetime.timedelta(self.range[0].weekday()))
        # the last day of the month with days added on (timedelta)
        # until saturday[5] (the last day of our calendar)
        self.complete_week_range.append(self.range[1] + datetime.timedelta(6 - self.range[1].weekday()))
        self.weeks = []
        weekstart = self.complete_week_range[0]
        while weekstart <= self.complete_week_range[1]:
            self.weeks.append(EventCalendarWeek(self, weekstart))
            weekstart += relativedelta(days=+7)
            pass
        pass

    def __str__(self):
        output = ''
        output += self.x.too('table', {'class': 'event-calendar-month'})
        output += self.x.too('thead', {'class': 'event-calendar-week'})
        ##
        # name and links
        output += self.x.too('tr')
        # month
        output += str(EventCalendarMonthNavigation(self.date_cursor, -1))
        output += str(EventCalendarMonthNavigation(self.date_cursor))
        output += str(EventCalendarMonthNavigation(self.date_cursor, +1))
        output += str(EventCalendarMonthNavigation(self.date_cursor, +2))
        output += self.x.toc()
        ##
        # weekday headers
        output += self.x.too('tr', {'class': 'event-calendar-week'})
        output += self.x.toFull('th', {'class': 'kw'}, '')
        for week in self.week_headers.values():
            output += self.x.too('th', {'class': 'event-calendar-weekday'})
            output += self.x.tot(str(week))
            output += self.x.toc()
        output += self.x.toc()
        output += self.x.toc()
        ##
        # weeks
        output += self.x.too('tbody', {'class': 'event-calendar-week'})
        for week in self.weeks:
            output += str(week)
        output += self.x.toc()
        output += self.x.toc()
        return output

    pass


class EventCalendarWeek:
    x = XmlOut()

    def __init__(self, parent, week_start):
        self.parent = parent
        self.range = []
        self.range.append(week_start - datetime.timedelta(week_start.weekday()))
        self.range.append(week_start + datetime.timedelta(6))
        self.days = []
        day = self.range[0]
        while day <= self.range[1]:
            calendar_day = EventCalendarDay(self, day)
            self.days.append(calendar_day)
            day += relativedelta(days=+1)
            pass
        pass

    def __str__(self):
        output = ''
        output += self.x.too('tr', {'class': 'event-calendar-week'})
        output += self.x.toFull('td', {'class': 'kw'}, self.range[0].strftime("%W"))
        for day in self.days:
            output += str(day)
            pass
        output += self.x.toc()
        return output

    pass


class EventCalendarDay:
    x = XmlOut()

    def __init__(self, parent, date_cursor):
        self.parent = parent
        self.date_cursor = date_cursor
        ##
        # through the hierarchy
        self.week = self.parent
        self.month = self.week.parent
        self.calendar = self.month.parent
        pass

    def in_month(self):
        return self.date_cursor >= self.month.range[0] and self.date_cursor <= self.month.range[1]

    def __str__(self):
        output = ''
        atts = {}
        atts['class'] = 'event-calendar-day'
        if self.in_month():
            atts['class'] += ' in-month'
            pass
        else:
            atts['class'] += ' not-in-month'
            pass
        events = self.calendar.get_events_by_day(self.date_cursor)
        if len(events):
            atts['class'] += ' event'
            pass
        else:
            atts['class'] += ' noevent'
            pass
        output += self.x.too('td', atts)
        if len(events):
            from event.views import event_list
            uri = urlresolvers.reverse(event_list,
                                       args=(),
                                       kwargs={"year": self.date_cursor.year,
                                               "month": self.date_cursor.month,
                                               "day": self.date_cursor.day
                                               }
                                       )
            title = []

            for event in events:
                title.append(u'%s' % event.name)
                pass
            title = u""  # .join(title)
            atts = {
                'href': uri,
                'title': title
            }
            output += self.x.toFull('a', atts, self.date_cursor.day)
            pass
        else:
            output += self.x.tot(self.date_cursor.day)
        output += self.x.toc()
        return output

    pass


if __name__ == '__main__':
    pass
