import ActiveLink from "./activelink";
import OrbitSvg from "./orbit-svg"
import classNames from "classnames";


const Header = () => {
    return (
        <header>
            <div className={"heading"}>
                <a title={"Berliner Sportverein &quot;Akademie der Wissenschaften&quot; e.V."}
                   href="/">
                    {/*        <img className={"inline w-20 h-20"}
                         src="/images/logo/adw-symbol.png"
                         alt="AdW"
                    />*/}
                    {/*<span className={"inline-block ml-4 relative top-3"}>
                    <OrbitSvg height="600px" width="600px"/>
                        </span>*/}
                    <img className={"inline w-16 h-16 mx-2 relative bottom-1"}
                         src="/images/logo/adw-symbol-animated.svg"
                         alt="AdW"
                    />

                    BSV AdW e.V. Tischtennis
                </a>


                <a title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                   href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                    <img
                        className={"inline w-12 mx-4"} src="/images/logo/tt-icon.svg"
                        alt="AdW"
                    />
                    Spielbetrieb bei bettv.de
                </a>
            </div>
            <nav>
                <ActiveLink
                    key={'Kontakt'}
                    href={'/kontakt/'}
                    className={classNames("sm:w-5 overflow-hidden overflow-ellipsis")}
                >
                    Kontakt
                </ActiveLink>

                <ActiveLink
                    key={'Turnhalle'}
                    href={'/turnhalle/'}
                    className={classNames("sm:w-5 overflow-hidden overflow-ellipsis")}
                >
                    Turnhalle
                </ActiveLink>

                <ActiveLink
                    key="Hallenkalender"
                    href="/kalender"
                    title={"Hallenkalender"}
                > <img src="/images/icon/calendar.svg" className={"w-5 h-5 mt-0.5 object-contain"}/>
                </ActiveLink>

                <ActiveLink
                    key={'Geschichte'}
                    href={'/geschichte/'}
                    className={classNames("sm:w-5 overflow-hidden overflow-ellipsis")}
                >
                    Geschichte
                </ActiveLink>

                <ActiveLink
                    key="LpzRechner"
                    href="/lpz"
                    title={"Lpz Rechner"}
                > <img src="/images/icon/calculator.svg" className={"w-5 h-5 mt-0.5"}/>
                </ActiveLink>

            </nav>

        </header>
    )
}


export default Header;
