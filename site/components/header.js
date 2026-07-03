import ActiveLink from "./activelink";
import classNames from "classnames";


const Header = () => {
    return (
        <header>
            <div className={"heading w-full px-4 py-2 flex flex-row items-center justify-between min-w-0"}>
                <a className="flex items-center h-full min-w-0" title={"Berliner Sportverein &quot;Akademie der Wissenschaften&quot; e.V."}
                   href="/">
                    <img className={"header-img-clamp mx-1 sm:mx-2"}
                         src="/images/logo/adw-symbol-animated.svg"
                         alt="AdW"
                    />
                </a>
                <a href="/">
                    <span className="header-text-clamp">BSV AdW e.V. Tischtennis</span>
                </a>

                <a className="flex items-center h-full min-w-0" title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                   href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                    <img
                        className={"tt-icon-clamp mx-2 sm:mx-4"} src="/images/logo/tt-icon.svg"
                        alt="AdW"
                    />
                </a>
            </div>
            <nav className="px-4 pt-2 nav-text-clamp flex justify-between items-center">
                <div className="flex gap-2 sm:gap-4 min-w-0 flex-1">
                    <ActiveLink
                        key={'Kontakt'}
                        href={'/kontakt/'}
                        className={classNames("truncate")}
                    >
                        Kontakt
                    </ActiveLink>

                    <ActiveLink
                        key={'Turnhalle'}
                        href={'/turnhalle/'}
                        className={classNames("truncate")}
                    >
                        Turnhalle
                    </ActiveLink>
                    <ActiveLink
                        key={'Geschichte'}
                        href={'/geschichte/'}
                        className={classNames("truncate")}
                    >
                        Geschichte
                    </ActiveLink>
                </div>
                <div className="flex gap-2 sm:gap-4 flex-shrink-0">
                    <ActiveLink
                        key="Hallenkalender 1"
                        href="/kalender1"
                        title={"Termine Halle 1"}
                        className={"nav-icon-link"}
                    > <img src="/images/icon/calendar-1.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                    </ActiveLink>
                    <ActiveLink
                        key="Hallenkalender 2"
                        href="/kalender2"
                        title={"Termine Halle 2"}
                        className={"nav-icon-link"}
                    > <img src="/images/icon/calendar-2.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                    </ActiveLink>

                    <ActiveLink
                        key="Jugendkalender"
                        href="/kalenderj"
                        title={"Termine Jugend"}
                        className={"nav-icon-link"}
                    > <img src="/images/icon/calendar-j.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                    </ActiveLink>

                    <ActiveLink
                        key="LpzRechner"
                        href="/lpz"
                        title={"Lpz Rechner"}
                        className={"nav-icon-link"}
                    > <img src="/images/icon/calculator.svg" className={"w-5 h-5 mt-0.5"}/>
                    </ActiveLink>
                </div>
            </nav>

        </header>
    )
}


export default Header;
