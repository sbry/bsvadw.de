import ActiveLink from "./activelink";
import classNames from "classnames";

const Footer = () => {
    return (
        <footer className={"w-full"}>
            <nav className="px-2 sm:px-4 py-2 nav-text-clamp flex justify-between items-center">
                <div className="flex gap-4 min-w-0 flex-1">
                    <ActiveLink
                        key={'Impressum'}
                        href={'/impressum/'}
                        className={classNames("truncate")}
                    >
                        Impressum
                    </ActiveLink>

                    <ActiveLink
                        key={'Datenschutz'}
                        href={'/datenschutz/'}
                        className={classNames("truncate")}
                    >
                        Datenschutz
                    </ActiveLink>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;
