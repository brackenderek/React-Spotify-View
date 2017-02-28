'use strict';

import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import ArtistList from './ArtistListComponent';

require('styles//ArtistInfoPane.css');

let ArtistInfoPaneComponent = (props) => (
  
  <div className="info-pane">
    <Image src={props.stateObj.imageUrl} responsive />
    <h4 className="info-pane-header">{props.stateObj.name}</h4>
    <p><strong>Genres: </strong>{props.stateObj.genres.toString().replace(/,/g,', ')}</p>
    <p><strong>Followers:</strong> {props.stateObj.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
    {
      props.stateObj.alternateSuggestions.length > 0
      &&
      <div className="alternate-suggestions">
        <p>Did you mean...</p>
        <ArtistList list={props.stateObj.alternateSuggestions} handleClick={props.newArtistSearch} />
      </div>
    }
  </div>

);

ArtistInfoPaneComponent.displayName = 'ArtistInfoPaneComponent';

export default ArtistInfoPaneComponent;
