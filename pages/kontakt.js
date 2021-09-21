export default function Kontakt() {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div>
                <h1> Kontakt aufnehmen</h1>
                <address className={"px-2"}>
                    <div className={'text-center'}>
                        Verein Allgemein
                    </div>
                    <br/>
                    <div className={'text-center font-bold text-2xl font-serif'}>
                        Andreas
                    </div>
                    <br/>
                    030 / 534 11 63<br/>
                    abteilungsleitungttadw[at]freenet.de
                </address>
                <address className={"px-2"}>
                    <div className={'text-center'}> Jugend</div>
                    <br/>
                    <div className={'text-center font-bold text-2xl font-serif'}>
                        Steven
                    </div>
                    <br/>0176 / 438 537 43<br/>steven.kecks[at]gmail.com
                </address>
                <address className={"px-2"}>
                    <div className={'text-center'}>
                        Damen
                    </div>
                    <br/>
                    <div className={'text-center font-bold text-2xl font-serif'}>
                        Bettina
                    </div>
                    <br/>
                    0170 / 8101614 <br/>
                    bettina.krause[at]spok-berlin.de
                </address>
                <address className={"px-2"}>
                    <div className={'text-center'}>
                        Herren
                    </div>
                    <br/>
                    <div className={'text-center font-bold text-2xl font-serif'}>
                        Dirk
                    </div>
                    <br/>0170 / 451 54 45<br/>dirk.giebson[at]gmail.com
                </address>


            </div>

            <div className="max-w-prose">
                <h1> Probetraining</h1>
                <p>
                    Wir bieten Ihnen ein kostenloses 4-wöchiges und über den Landessportbund Berlin versichertes
                    Probetraining an. Dafür benötigen Sie: Freude am Tischtennis und bestenfalls Vereinserfahrung,
                    Sportkleidung, Hallenschuhe mit heller Sohle und einen Tischtennisschläger.
                </p>
                <p>
                    Nach dem Probetraining treffen Sie und wir die Entscheidung, ob Sie dem Verein beitreten möchten
                    und können. Für die Aufnahme in unseren Verein benötigen wir einen mit folgenden Daten
                    ausgefüllten
                    Aufnahmeantrag den Sie in der Sporthalle erhalten: Vor- und Nachname, Geburtsdatum und Ihre
                    Anschrift. Um Sie über wichtige Ereignisse wie z.B. Hallensperrungen, Vereinsfeiern und Turniere
                    informieren zu können, wäre die Angabe einer Emailadresse vorteilhaft. Wenn Sie vorher bei einem
                    anderen Verein gespielt haben, wird der Name des Vereins und des Verbandes benötigt.
                </p>
                <p>
                    Nach erfolgter Aufnahme wird sich unser Kassenwart Herr Ingo Overbeck bei Ihnen bzgl. der
                    Beitragserhebung melden. Die Bezahlung der Mitgliedsbeiträge ist bei uns in bar an unseren
                    Kassenwart direkt in der Halle oder per Überweisung möglich. Die Beiträge können viertel-, halb-
                    oder jährlich bezahlt werden, immer bis spätestens zum 31.12. des jeweiligen Jahres. Die
                    Kontoverbindung für Beitragsüberweisungen erhalten sie vom Kassenwart. Einmalig wird eine
                    Aufnahmegebühr von 20 € fällig. Der Monatsbeitrag beträgt 12 €.
                </p>
                <p>
                    Stand: September 2021
                </p>
            </div>
        </div>
    )
}
