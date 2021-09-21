import ActiveLink from "./activelink";

export default function Header() {
    return (
        <header>
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <a title={"Berliner Sportverein Akademie der Wissenschaften e.V."}
                   className={'mx-5 font-bold text-white text-xl md:text-2xl py-2'} href="/">
                    <img
                        className={"inline-block w-12 h-12 mr-2"} src="/images/logo/adw-symbol.png"
                        alt="AdW"
                    />
                    BSV AdW e.V. Tischtennis
                </a>


                <a title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                   className={'mx-5 font-bold text-white text-xl md:text-2xl py-2'}

                   href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                    <img
                        className={"inline-block w-12 mr-3"} src="/images/logo/tt-icon.svg"
                        alt="AdW"
                    />
                    BeTTV-Spielbetrieb

                </a>


            </div>
            <nav>
                {[
                    {name: 'Kontakt', href: '/kontakt/'},
                    {name: 'Sporthalle', href: '/sporthalle/'},
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