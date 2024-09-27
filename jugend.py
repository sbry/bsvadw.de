##
# https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=2396&Runde=1&Hallenplan=False
import icalendar
from pathlib import Path
import copy, re


def all():
    ics_path = Path("bsvadw.ics")
    with ics_path.open() as f:
        calendar = icalendar.Calendar.from_ical(f.read())
    return calendar


def jugend():
    wanted = [
        '(Jungen', '(Mädchen'
    ]
    jugend_calendar = icalendar.Calendar()
    jugend_calendar.add('prodid', '-//icalcombine//NONSGML//EN')
    jugend_calendar.add('version', '2.0')
    jugend_calendar.add('x-wr-calname', "BSVADW Jugendkalender")

    for event in all().walk("VEVENT"):
        # print(event.get("SUMMARY"))
        if re.search('\((Jungen|Mädchen)', event.get('SUMMARY')):
            copied_event = copy.copy(event)
            jugend_calendar.add_component(copied_event)
    return jugend_calendar


if __name__ == '__main__':
    calendar = jugend()
    print(calendar.to_ical().decode('utf-8'))
    # for event in calendar.walk('VEVENT'):
    #      print(event.get("SUMMARY"))
    # print(jugend_calendar)
    pass


#
