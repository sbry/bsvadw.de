import Link from 'next/link'


import ActiveLink from "./activelink";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    return (
        <header className="">

            <div className="flex ml-5">

                <nav className={"rounded-t-md"}>

                    {[
                        {name: 'Kontakt', href: '/kontakt'},
                        {name: 'Sporthalle', href: '/sporthalle'},
                        {name: 'Geschichte', href: '/geschichte'},
                    ].map((item) => (
                        <ActiveLink

                            key={item.name}
                            href={item.href}
                            className={item.current ? 'active' : ''}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </ActiveLink>
                    ))}
                    <a
                        className={"external-link"}
                        href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                        BeTTV-Spielbetrieb
                    </a>


                    {[
                        {name: 'Impressum', href: '/impressum'},
                        {name: 'Datenschutz', href: '/datenschutz'},
                    ].map((item) => (
                        <ActiveLink

                            key={item.name}
                            href={item.href}
                            className={item.current ? 'active' : ''}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </ActiveLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}