'use strict';

import React from 'react';

require('styles//ArtistList.css');

let ArtistListComponent = function(props){
  
  // map through list of artists and generate a clickable option for each
  let artists = props.list.map(function(item){
    return (
      <div key={item.id} className="list-artist clearfix" onClick={() => props.handleClick(item.href)}>
        <div className="pull-left">
          <img src={item.images.length > 0 ? item.images[0].url : './images/profile_default.png'} />
        </div>
        <p className="pull-left">{item.name}</p>
      </div>
    );
  });
  
  return (
    <div className="artist-container">
      {artists}
    </div>
  );
};

ArtistListComponent.displayName = 'ArtistListComponent';

export default ArtistListComponent;
