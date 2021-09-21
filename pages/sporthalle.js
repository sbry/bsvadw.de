export default function Geschichte() {
    return (

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div className="">
                <h1>Sporthalle der Sophie-Brahe-Gemeinschaftsschule</h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d852.6742272116412!2d13.477315803550722!3d52.48123138055637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f1840859eb7%3A0x64d96298395db148!2sAm+Pl%C3%A4nterwald+17%2C+12435+Berlin!5e1!3m2!1sde!2sde!4v1413548933607"
                    style={{border:0}} width="100%" height="500px" frameBorder="0"></iframe>
            </div>

            <div className="">
                <h2>Adresse</h2>
                <address>
                    Am Plänterwald 17 <br/>12435 Berlin <br/>

                    <small>Eingang zur Halle zu Fuß über Erwin-Bennewitz-Weg</small>


                </address>
                <h2>Fahrverbindungen</h2>
                <ul>
                    <li>
                        Bus 165/166/377 bis S-Bahnhof Plänterwald
                    </li>
                    <li>
                        Bus 265 bis Rathaus Treptow
                    </li>
                    <li>
                        S-Bahn
                        S8/S85/S9 bis
                        S-Bahnhof Plänterwald
                    </li>
                </ul>


            </div>
        </div>


    )
}
