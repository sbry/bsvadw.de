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
            <div className={"grid grid-cols-1 sm:grid-cols-2 mb-5 sm:mb-1"}>
                <div title={"Berliner Sportverein Akademie der Wissenschaften e.V."}
                     className={'mx-5 font-bold text-white text-xl md:text-2xl py-2'}>
                    <a href="/">
                        <img
                            className={"inline-block w-12 h-12 mr-2"} src="/logo/adw-symbol.png"
                            alt="AdW"
                        />
                        BSV AdW e.V. Tischtennis
                    </a>


                </div>
                <div title={"Spielbetrieb des BSV AdW beim Berliner Tischtennisverband"}
                     className={'mx-5 font-bold text-white text-xl md:text-2xl py-2'}
                >
                    <a
                        className={""}
                        href={"https://bettv.tischtennislive.de/default.aspx?L1=Public&L2=Verein&L2P=1198&Page=Spielbetrieb&Sportart=96"}>
                        <img
                            className={"inline-block w-12 mr-3"} src="/logo/tt-icon.svg"
                            alt="AdW"
                        />
                        BeTTV-Spielbetrieb

                    </a>


                </div>
            </div>
            <Header/>

            <main>{children}</main>
            <Footer/>
        </>
    )
}