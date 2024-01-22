import {
    createCalendar,
    initMonthSelectors
} from "../components/calendar";


const fetchUrlBody = async (url) => {
    const response = await fetch(url);
    return await response.text()
}

const ics_sources = await fetchUrlBody(url);

export default function Calendar() {

    // createCalendar();
    // initMonthSelectors();
    return (
        <div className="calendar-month">
            <section className="calendar-month-header">
                <div
                    id="selected-month"
                    className="calendar-month-header-selected-month"
                ></div>
                <section className="calendar-month-header-selectors">
                    <span id="previous-month-selector">&lt;</span>
                    <span id="present-month-selector">Today</span>
                    <span id="next-month-selector">&gt;</span>
                </section>
            </section>

            <ol
                id="days-of-week"
                className="day-of-week"
            ></ol>


            <ol
                id="calendar-days"
                className="days-grid"
            ></ol>

        </div>

    )
};


