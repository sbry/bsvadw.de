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