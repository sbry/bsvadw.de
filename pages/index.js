import MyGallery from "../components/galerie";

export default function Index() {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div className="">
                <h1>
                    Tischtennis in Berlin Treptow</h1>
                <p>
                    Unsere Abteilung findet man im Osten Berlins, im schönen
                    grünen Herzen des Plänterwald. Wir sind ein sportlich engagierter
                    Verein, bei dem die Kombination von Spielfreude und persönlichem
                    Miteinander im Vordergrund steht. Dazu fördern wir ein breites
                    Angebot an Mannschaften in unterschiedlichen Spielklassen des
                    Berliner Tischtennisverbandes und den Breitensport.
                </p>
                <p>
                    Um weiterhin auf hohen Niveau spielen zu können, suchen wir verstärkt
                    Spieler und Spielerinnen für die 1. Kreisklasse bis zur Bezirksklasse!
                </p>

                <h1>Wöchentliche Trainingszeiten</h1>
                <div className={"grid grid-flow-col grid-cols-2 grid-rows-1 gap-5"}>
                    <div>
                        <h2>Schüler- und Jugend</h2>
                        <dl>
                            <dt>Montag</dt>
                            <dd>17.30 - 19.00 Uhr</dd>
                            <dt>Mittwoch</dt>
                            <dd>17.30 - 19.00 Uhr</dd>
                        </dl>
                    </div>
                    <div>
                        <h2>Erwachsenen</h2>
                        <dl>
                            <dt>Montag</dt>
                            <dd>19.00 - 22.00 Uhr</dd>
                            <dt>Mittwoch</dt>
                            <dd>19.00 - 22.00 Uhr</dd>
                            <dt>Freitag</dt>
                            <dd>18.00 - 22.00 Uhr</dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="py-4">

                <MyGallery/>

            </div>
        </div>
    )
}
