import Head from 'next/head'

import Header from './header'
import Footer from './footer'

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>BSV AdW e.V. Tischtennis</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div title={"Berliner Sportverein Akademie der Wissenschaften e.V."} className={'mx-5 font-bold text-white text-xl sm:text-2xl py-2'}>
                <a href="/">
                    <div className={" "}>
                        <img
                            className={"inline-block w-10 h-10 mr-2"} src="/logo/adw-symbol.png"
                            alt="AdW"
                        />
                        BSV AdW e.V. Tischtennis
                    </div>
                </a>


            </div>
            <Header/>

            <main>{children}</main>
            <Footer/>
        </>
    )
}