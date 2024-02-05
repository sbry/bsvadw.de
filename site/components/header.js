import ActiveLink from "./activelink";
import OrbitSvg from "./orbit-svg"


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
                {[
                    {name: 'Kontakt', href: '/kontakt/'},
                    {name: 'Turnhalle', href: '/turnhalle/'},
                    {name: 'Geschichte', href: '/geschichte/'},
                ].map((item) => (
                    <ActiveLink
                        key={item.name}
                        href={item.href}
                        className={""}
                    >
                        {item.name}
                    </ActiveLink>
                ))}
                <ActiveLink
                    key="Hallenkalender"
                    href="/kalender"
                    title={"Hallenkalender"}
                > <img src="/images/icon/calendar.svg" className={"w-5 h-5 mt-0.5"}/>
                </ActiveLink>
            </nav>
        </header>
    )
}


export default Header;
