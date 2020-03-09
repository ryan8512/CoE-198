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
    src: require('./img/secure_image.jpg'),
    caption: 'Secure'
  },
  {
    src: require('./img/accessibility.jpg'),
    caption: 'Accessible'
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
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
       <div>
            <Jumbotron class="jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">Secure and Accessible Election for Everyone</h1>
                <p class="lead">Plan your election now</p>
              </div>
            </Jumbotron>
            <div class="container">
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