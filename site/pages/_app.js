import '../styles/app.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";
import Layout from '../components/layout'

const App = ({Component, pageProps}) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App
