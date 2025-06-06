import ActiveLink from "./activelink";
import BohrAtom from "./bohr-atom"
import classNames from "classnames";


const Header = () => {
    return (
        <header>
            <div className={"heading"}>
                <a className={"no-underline hover:no-underline"} style={{display: "flex"}} title={"Berliner Sportverein &quot;Akademie der Wissenschaften&quot; e.V."}
                   href="/">
                    {<span className={""}>
                    <BohrAtom width={72} height={72}/>
                        </span>}

                    <span className={"mt-5 mx-1"}>

                    BSV AdW e.V. Tischtennis
                    </span>
                </a>

            </div>
            <nav>
                <ActiveLink
                    key={'Kontakt'}
                    href={'/kontakt/'}
                    className={classNames("w-16 overflow-hidden overflow-ellipsis sm:w-16")}
                >
                    Kontakt
                </ActiveLink>

                <ActiveLink
                    key={'Turnhalle'}
                    href={'/turnhalle/'}
                    className={classNames("w-20 overflow-hidden overflow-ellipsis sm:w-20")}
                >
                    Turnhalle
                </ActiveLink>
                <ActiveLink
                    key={'Geschichte'}
                    href={'/geschichte/'}
                    className={classNames("w-12 overflow-hidden overflow-ellipsis sm:w-20")}
                >
                    Geschichte
                </ActiveLink>
                <ActiveLink
                    key="Hallenkalender 1"
                    href="/kalender1"
                    title={"Termine Halle 1"}
                > <img src="/images/icon/calendar-1.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                </ActiveLink>
                <ActiveLink
                    key="Hallenkalender 2"
                    href="/kalender2"
                    title={"Termine Halle 2"}
                > <img src="/images/icon/calendar-2.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                </ActiveLink>

                <ActiveLink
                    key="Jugendkalender"
                    href="/kalenderj"
                    title={"Termine Jugend"}
                > <img src="/images/icon/calendar-j.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                </ActiveLink>

                <ActiveLink
                    key="LpzRechner"
                    href="/lpz"
                    title={"Lpz Rechner"}
                > <img src="/images/icon/calculator.svg" className={"w-5 h-5 mt-0.5"}/>
                </ActiveLink>

                <a title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                   className={"inline w-6"}
                   href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                    <img
                        src="/images/logo/tt-icon.svg"
                        alt="AdW"
                    />
                </a>

            </nav>

        </header>
    )
}


export default Header;
