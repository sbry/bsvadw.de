import ActiveLink from "./activelink";

export default function Header() {
    return (
        <header>
            <div className={"heading"}>
                <a title={"Berliner Sportverein Akademie der Wissenschaften e.V."}
                   href="/">
                    <img
                        className={"inline w-12 h-12 mr-1 lg:mr-2"} src="/images/logo/adw-symbol.png"
                        alt="AdW"
                    />
                    BSV AdW e.V. Tischtennis
                </a>


                <a title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                   href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                    <img
                        className={"inline w-12 sm:ml-6 mr-1 lg:mr-2"} src="/images/logo/tt-icon.svg"
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
                    >
                        {item.name}
                    </ActiveLink>
                ))}
            </nav>
        </header>
    )
}