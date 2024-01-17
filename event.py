# -*- coding: utf-8 -*-
#
# File:     /Users/justin/workspace/bsvadw.de/event.py
# Author:   Justin Salisbury justin@moriarty.fritz.box
# Created:  Tue Jan 16 21:26:30 2024
#
import datetime
import calendar
from dateutil.relativedelta import relativedelta

from lxml import etree
from lxml.builder import E

def prettyprint(element, **kwargs):
    xml = etree.tostring(element, pretty_print=True, **kwargs)
    print(xml.decode(), end='')

def stringify(element):
    return etree.tostring(element).decode()

# th = E.th(E.a(href="test2"), test="1")
# prettyprint(th)
# print(stringify(th))


class Calendar:
    def __init__(self, date_cursor=datetime.date.today()):
        self.date_cursor = date_cursor
        self.months = []
        month = CalendarMonth(self, self.date_cursor)
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


class CalendarMonthNavigation:

    def __init__(self, date_cursor, delta=0):
        self.date_cursor = date_cursor
        self.relativedelta = delta
        self.month = date_cursor + relativedelta(months=self.relativedelta)
        pass

    def lxml(self):
        atts = {'colspan': 2,
                'class': 'event-calendar-month-navigation'}
        if self.month.month == self.date_cursor.month:
            atts['class'] += ' active'
        else:
            atts['class'] += ' inactive'

        text = '%s, %s' % (
            Event.get_monthname(self.month.month, short=True),
            self.month.year)
        return E.th(E.a(text, href=''),**atts)

class CalendarMonth:
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
            self.weeks.append(CalendarWeek(self, weekstart))
            weekstart += relativedelta(days=+7)
            pass
        pass

    def lxml(self):
        return E.table(
            E.thead(
                E.tr(
                    CalendarMonthNavigation(self.date_cursor, -1).lxml(),
                    CalendarMonthNavigation(self.date_cursor).lxml(),
                    CalendarMonthNavigation(self.date_cursor, +1).lxml(),
                    CalendarMonthNavigation(self.date_cursor, +2).lxml()
                ),
                E.tr(
                    E.th(**{'class': 'kw'}),
                    *[
                        E.th(str(week)**{'class': 'event-calendar-weekday'})
                        for week in self.week_headers.values()
                    ],
                    **{'class': 'event-calendar-week'}
                ),
                **{'class': 'event-calendar-week'}),
            E.tbody(
                *[
                    week.lxml() for week in self.weeks
                ],
                **{'class': 'event-calendar-week'}
            ),
            **{'class': 'event-calendar-month'})
    pass


class CalendarWeek:
    def __init__(self, parent, week_start):
        self.parent = parent
        self.range = []
        self.range.append(week_start - datetime.timedelta(week_start.weekday()))
        self.range.append(week_start + datetime.timedelta(6))
        self.days = []
        day = self.range[0]
        while day <= self.range[1]:
            calendar_day = CalendarDay(self, day)
            self.days.append(calendar_day)
            day += relativedelta(days=+1)
            pass
        pass

    def lxml(self):
        return E.tr(
            E.td(
                self.range[0].strftime("%W"),
                **{'class': 'kw'}),
            *[
                day.lxml() for day in self.days
            ],
            **{'class': 'event-calendar-week'})
    pass


class CalendarDay:
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

    def lxml(self):
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
        return E.td(
            E.a(
                self.date_cursor.day
            ),
            **atts)



if __name__ == '__main__':
    pass
