import ImageGallery from 'react-image-gallery';

const images = ["1242.jpg",
    "1244.jpg",
    "1246.jpg",
    "1248.jpg",
    "1250.jpg",
    "1252.jpg",
    "1254.jpg",
    "1256.jpg",
    "1258.jpg",
    "1262.jpg",
    "1264.jpg",
    "1268.jpg"].map(filename => ({
    original: `/images/galerie/${filename}`,
    thumbnail: `/images/galerie/${filename}`
}));
export default function MyGallery(props) {
    return <ImageGallery slideInterval={2500} slideDuration={500} showThumbnails={true}
                         showFullscreenButton={true}
                         autoPlay={true}
                         items={images}/>;

}
