import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

const Redirect = () => {
    const router = useRouter();
    useEffect(() => {

        router.push('/kalender1');
    }, [])
    return <span/>
}


export default Redirect;
