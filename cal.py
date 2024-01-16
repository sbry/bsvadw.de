#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/cal.py
# Author:   Justin Salisbury justin@sinube
# Created:  Tue Jan 16 16:23:57 2024
#

import ics, requests, calendar
 
# Parse the URL
bettv_url = "https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=***REMOVED***&Runde=2&Hallenplan=True"
bettv_cal = ics.Calendar(requests.get(bettv_url).text)
 
google_url = "https://calendar.google.com/calendar/ical/***REMOVED***%40group.calendar.google.com/public/basic.ics"
google_cal = ics.Calendar(requests.get(google_url).text)

if __name__ == '__main__':
    print(google_cal.events)
    
    kalenderblatt = calendar.TextCalendar(calendar.MONDAY)
    ausgabe = kalenderblatt.formatmonth(2020,1)
    print(ausgabe)
    
    pass


