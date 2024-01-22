import '../styles/app.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}