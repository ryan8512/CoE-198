import React, {useState} from 'react';
import styles from './App.css';

import { 
  Jumbotron,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
 } from 'reactstrap';

 const items = [
  {
    src: require('./img/accessibility.jpg'),
    caption: 'Accessible',
    text: 'Vote Anywhere'
  },
  {
    src: require('./img/secure_image.jpg'),
    caption: 'Secure',
    text: 'Hashed with SHA-256',
  },
  {
    src: require('./img/blockchain.jpg'),
    caption: 'Blockchain',
    text: 'Decetralized',
  },
  
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }

    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.text} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
       <div>
            <Jumbotron className="jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Secure and Accessible Election for Everyone</h1>
                <p className="lead">Plan your blockchain lection now</p>
              </div>
            </Jumbotron>
            <div className="container">
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                className = {styles.carousel}
              >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
              </Carousel>
            </div>
       </div>
    );
}
 
export default Home;