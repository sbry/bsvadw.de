export default function Geschichte() {
    return (

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 "}>
            <div className="">
                <iframe
                    className="border-none"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d852.6742272116412!2d13.477315803550722!3d52.48123138055637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f1840859eb7%3A0x64d96298395db148!2sAm+Pl%C3%A4nterwald+17%2C+12435+Berlin!5e1!3m2!1sde!2sde!4v1413548933607"
                    width="100%" height="500px" frameBorder="0"></iframe>
            </div>


            <div className="">
                <address className={'text-2xl'}>
                    <p className={'font-bold'}>Turnhalle der Sophie-Brahe-Schule</p>
                    <p>Am Plänterwald 17</p><p>12435 Berlin</p>
                    <p className={"text-sm"}>
                        Eingang zur Halle zu Fuß über Erwin-Bennewitz-Weg
                    </p>

                </address>

                <div className={"m-5"}>
                    <h1>Öffentliche Fahrverbindungen</h1>
                    <dl>
                        <dt>Bus 165/166/377</dt>
                        <dd>bis S-Bahnhof Plänterwald</dd>
                        <dt>
                            Bus 265
                        </dt>
                        <dd>bis Rathaus Treptow</dd>

                        <dt>
                            S-Bahn
                            S8/S85/S9
                        </dt>
                        <dd>bis
                            S-Bahnhof Plänterwald
                        </dd>

                    </dl>

                </div>

            </div>


        </div>


    )
}
