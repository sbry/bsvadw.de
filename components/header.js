import ActiveLink from "./activelink";

export default function Header() {
    return (
        <header className="">
            <div className="flex ml-5">
                <nav className={"rounded-t-md"}>
                    {[
                        {name: 'Kontakt', href: '/kontakt/'},
                        {name: 'Sporthalle', href: '/sporthalle/'},
                        {name: 'Geschichte', href: '/geschichte/'},
                        {name: 'Impressum', href: '/impressum/'},
                        {name: 'Datenschutz', href: '/datenschutz/'},
                    ].map((item) => (
                        <ActiveLink
                            key={item.name}
                            href={item.href}
                        >
                            {item.name}
                        </ActiveLink>
                    ))}

                </nav>
            </div>
        </header>
    )
}