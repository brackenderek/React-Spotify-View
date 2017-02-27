'use strict';

import React from 'react';
import Slider from 'react-slick';

require('styles//DisplayCard.css');

let DisplayCardComponent = function(props){
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '0px',
    slidesToShow: 5,
    speed: 500,
    focusOnSelect: true,
    afterChange: function (currentSlide) {
      props.setCurrentAlbum(props.cards[currentSlide]);
    }
  };
  return (
    <div>
      <Slider {...settings}>
        {
          props.cards.map((item) =>
          <div className="card" key={item.id}>
            <img src={item.images.length > 0 ? item.images[0].url : './images/defaultCarouselImage.png'} />
          </div>
          )
        }
      </Slider>
    </div>
  );
}

DisplayCardComponent.displayName = 'DisplayCardComponent';

// Uncomment properties you need
// DisplayCardComponent.propTypes = {};
// DisplayCardComponent.defaultProps = {};

export default DisplayCardComponent;
