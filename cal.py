#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/cal.py
# Author:   Justin Salisbury justin@sinube
# Created:  Tue Jan 16 16:23:57 2024
#

class Test:
    pass

from ics import Calendar
import requests
 
# Parse the URL
url = "https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=***REMOVED***&Runde=2&Hallenplan=True"
cal = Calendar(requests.get(url).text)
 
# Print all the events
print(cal.events)

if __name__ == '__main__':
    pass


