import {useRouter} from 'next/router'

const ActiveLink = ({children, href, title, className}) => {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a title={title} className={router.asPath === href ? 'active ' : ' ' + className}
           href={href} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ActiveLink;
