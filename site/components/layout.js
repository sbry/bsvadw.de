import Head from 'next/head'
import Header from './header'
import Footer from './footer'

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>BSV AdW e.V. Tischtennis</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/adw-symbol.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/images/logo/adw-symbol-72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/images/logo/adw-symbol-76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/images/logo/adw-symbol-114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/images/logo/adw-symbol-120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/images/logo/adw-symbol-144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/images/logo/adw-symbol-152.png"/>
            </Head>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}

export default Layout;
