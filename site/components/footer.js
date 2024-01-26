import ActiveLink from "./activelink";

const Footer = () => {
    return (
        <footer>
            <nav>
                {[
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
        </footer>
    )
}


export default Footer;
