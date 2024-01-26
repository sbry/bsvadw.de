import Head from 'next/head'
import Header from './header'
import Footer from './footer'

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>BSV AdW e.V. Tischtennis</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}

export default Layout;
