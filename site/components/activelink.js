import {useRouter} from 'next/router'

const ActiveLink = ({children, href}) => {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a className={router.asPath === href ? 'active' : ''}
           href={href} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ActiveLink;
