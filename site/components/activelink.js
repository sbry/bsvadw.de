import {useRouter} from 'next/router'
import classNames from "classnames";

const ActiveLink = ({children, href, title, className}) => {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a title={title}
           className={classNames(className, {
               'active': router.asPath.replace(/\/$/, '') === href.replace(/\/$/, '')
           })}
           href={href}
           onClick={handleClick}>
            {children}
        </a>
    )
}

export default ActiveLink;
