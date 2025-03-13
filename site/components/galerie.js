import ImageGallery from 'react-image-gallery';

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const images = [
    'B70A0029.jpg',
    'B70A0069.jpg',
    'B70A0164.jpg',
    'B70A0177.jpg',
    'B70A0241.jpg',
    'B70A0247.jpg',
    'B70A0337.jpg',
    'B70A0345.jpg',
    'B70A0427.jpg',
    'B70A0651.jpg',
    'B70A0661.jpg',
    // das ist irgendwie klein gutes Bild
    //    'B70A0694.jpg',
    'B70A0721.jpg',
// das ist das Gruppenbild
    // https://www.bsvadw.de/images/galerie24/1024x/B70A7253.jpg

    // 'B70A7253.jpg',
    'gruppenbild.jpg',
    'B70A7304.jpg',
    'B70A7325.jpg',
    'B70A7333.jpg',
    'B70A7342.jpg',
    'B70A7350.jpg',
    'B70A7402.jpg',
    'B70A7489.jpg',
    'B70A7529.jpg',
    'B70A7540.jpg',
    'B70A7565.jpg',
    'B70A7596.jpg',
    'B70A7631.jpg',
    'B70A7717.jpg',
    'B70A7735.jpg',
    'B70A7921.jpg',
    'B70A7938.jpg',
    'B70A7958.jpg',
    'B70A8011.jpg',
    'B70A8015.jpg',
    'B70A8045.jpg',
    'B70A9839.jpg',
    '_OS_3390.jpg',
    '_OS_3500.jpg'
].map(filename => ({
    original: `/images/galerie24/1024x/${filename}`,
    thumbnail: `/images/galerie24/200x/${filename}`
}));
const MyGallery = () => {
    return <ImageGallery slideInterval={2500} slideDuration={500} showThumbnails={true}
                         showFullscreenButton={true}
                         autoPlay={true}
                         items={shuffle(images)}/>;

}

export default MyGallery;
