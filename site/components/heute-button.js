import React, {useEffect, useState} from 'react';
import ICAL from 'ical.js';

const ICS_FILES = [
    '/heimspiele-halle1.ics',
    '/termine-halle1.ics',
    '/termine-halle2.ics',
    '/termine-jugend.ics'
];

const HeuteButton = () => {
    const [eventsToday, setEventsToday] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkTodayEvents = async () => {
            const today = new Date();
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            try {
                const allEvents = [];
                await Promise.all(ICS_FILES.map(async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) return;
                    const data = await response.text();
                    
                    if (!data.includes('BEGIN:VCALENDAR')) return;

                    const jcalData = ICAL.parse(data);
                    const comp = new ICAL.Component(jcalData);
                    const vevents = comp.getAllSubcomponents('vevent');

                    vevents.forEach(vevent => {
                        const event = new ICAL.Event(vevent);
                        const start = event.startDate.toJSDate();
                        const end = event.endDate.toJSDate();
                        
                        const eventStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                        const eventEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

                        if (eventStart <= todayStart && eventEnd >= todayStart) {
                            allEvents.push({
                                summary: event.summary,
                                location: event.location,
                                start: event.startDate.toJSDate(),
                                isAllDay: event.startDate.isDate
                            });
                        }
                    });
                }));

                setEventsToday(allEvents);
            } catch (e) {
                console.error("Error checking today's events", e);
            }
        };

        checkTodayEvents();
    }, []);

    if (eventsToday.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-xs sm:text-sm animate-pulse flex items-center border-none cursor-pointer"
                title="Heute gibt es Termine! Anklicken für Details."
            >
                Aktuell
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="bg-green-900 text-white px-4 py-2 flex justify-between items-center">
                            <h3 className="text-lg font-bold m-0">Termine Heute</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-white hover:text-gray-300 bg-transparent border-none text-2xl leading-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4 max-h-[70vh] overflow-y-auto">
                            <ul className="list-none p-0 m-0">
                                {eventsToday.map((event, index) => (
                                    <li key={index} className={index !== 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}>
                                        <div className="font-bold text-gray-900">{event.summary}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {event.isAllDay ? "Ganztägig" : event.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + " Uhr"}
                                            {event.location && ` • ${event.location}`}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-green-900 text-white px-4 py-2 rounded font-bold hover:bg-green-800 transition-colors border-none cursor-pointer"
                            >
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeuteButton;
