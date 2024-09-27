##
# https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=2396&Runde=1&Hallenplan=False
#
# -> termine-bsvadw.ics
import icalendar
from pathlib import Path
import copy, re


def termine_bsvadw():
    ics_path = Path("bsvadw.ics")
    with ics_path.open() as f:
        calendar = icalendar.Calendar.from_ical(f.read())
    return calendar


def termine_jugend():
    jugend_icalendar = icalendar.Calendar()
    jugend_icalendar.add('prodid', '-//termine_jugend//NONSGML//DE')
    jugend_icalendar.add('version', '1.0')
    jugend_icalendar.add('x-wr-calname', "BSVADW Jugendkalender")

    for event in termine_bsvadw().walk("VEVENT"):
        # print(event.get("SUMMARY"))
        if re.search('\((Jungen|Mädchen)', event.get('SUMMARY')):
            copied_event = copy.copy(event)
            jugend_icalendar.add_component(copied_event)
    return jugend_icalendar


if __name__ == '__main__':
    calendar = termine_jugend()
    print(calendar.to_ical().decode('utf-8'))

#
