import MyGallery from "../components/galerie";

const Index = () => <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
    <div>
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
            Wir sind ein größerer Verein mit einer nicht allzu großen Halle.
            Daher suchen wir im Moment nur Spielerinnen, die unsere 1. Damen verstärken können.
        </p>

        <h1>Wöchentliche Trainingszeiten</h1>
        <div className={""}>
            <div className={"inline-block mr-5 w-60"}>
                <h2>Schüler und Jugendliche</h2>
                <dl>
                    <dt>Montag</dt>
                    <dd>17.30 - 19.00 Uhr</dd>
                    <dt>Mittwoch</dt>
                    <dd>17.30 - 19.00 Uhr</dd>
                    {/*<dt>Freitag</dt>*/}
                    {/*<dd>17.30 - 19.00 Uhr</dd>*/}
                </dl>
            </div>
            <div className={"inline-block w-60"}>
                <h2>Erwachsene</h2>
                <dl>
                    <dt>Montag</dt>
                    <dd>19.00 - 22.00 Uhr</dd>
                    <dt>Mittwoch</dt>
                    <dd>19.00 - 22.00 Uhr</dd>
                    <dt>Freitag</dt>
                    <dd>19.00 - 22.00 Uhr</dd>
                </dl>
            </div>
        </div>
        {/*<address className="content-center text-lg">*/}
        {/*    <p className="text-center">Hinweis</p>*/}
        {/*    <p>*/}
        {/*        Die Duschen in der Jungen-Umkleide sind momentan gesperrt <span className="text-xl">😭</span>*/}
        {/*    </p>*/}
        {/*</address>*/}
    </div>

    <div>
        <MyGallery/>
    </div>
</div>


export default Index;
