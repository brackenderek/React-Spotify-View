'use strict';

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ArtistInfoPane from './ArtistInfoPaneComponent';
import SongList from './SongListComponent';
import ArtistList from './ArtistListComponent';
import DisplayCard from './DisplayCardComponent';

require('styles//ArtistInterface.css');

let ArtistInterfaceComponent = function(props){
  var artistsString = props.stateObj.currentAlbum.length > 0 ? createArtistsString(props.stateObj.currentAlbum[0].artists) : '';
  return (
    <Row>
      <Col xs={12} md={2}>
        <ArtistInfoPane stateObj={props.stateObj} newArtistSearch={props.newArtistSearch} />
      </Col>
      <Col xs={12} md={10}>
        <div className="deep-info-block">
          <Tabs activeKey={props.stateObj.tabKey} onSelect={onTabSelect} id="controlled-tabs">
            <Tab eventKey={1} title="Top 10 Songs on Spotify">
              <SongList list={props.stateObj.topTen} albumName=""/>
            </Tab>
            <Tab eventKey={2} title="Albums">
              {
                props.stateObj.albums.length > 0
                ?
                <div className="albums-section">
                  <DisplayCard cards={props.stateObj.albums} setCurrentAlbum={props.setCurrentAlbum} />
                  <div className="album-info">
                    <h4>Album: {props.stateObj.currentAlbum[0].name}</h4>
                    <p>Artists: {artistsString}</p>
                    {props.stateObj.currentAlbumReleaseDate.length > 0 && <p>Release Date: {props.stateObj.currentAlbumReleaseDate}</p>}
                    {props.stateObj.currentAlbumLabel.length > 0 && <p>Label: {props.stateObj.currentAlbumLabel}</p>}
                    {!props.stateObj.currentAlbumTracksReceived && <span onClick={() => getTracks(props.stateObj.currentAlbum[0].href)}>Album Info <Glyphicon glyph="triangle-bottom" /></span>}
                    {props.stateObj.currentAlbumTracks.length > 0 && <SongList list={props.stateObj.currentAlbumTracks} albumName={props.stateObj.currentAlbum[0].name} />}
                  </div>
                </div>
                :
                <p className="no-matches">No Albums Found...</p>
              }
            </Tab>
            <Tab eventKey={3} title="Related Artists">
              {
                props.stateObj.relatedArtists.length > 0
                ?
                <ArtistList list={props.stateObj.relatedArtists} handleClick={props.newArtistSearch} />
                :
                <p className="no-matches">No Related Artists Found...</p>
              }
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
  
  function getTracks(url){
    props.getTracks(url);
  }

  function createArtistsString(arr){
    let albumArtists = '';
    for(var i = 0; i < arr.length; i++){
      if(i == arr.length - 1){
        albumArtists += arr[i].name;
      }
      else{
        albumArtists += arr[i].name + ', ';
      }
    }
    return albumArtists;
  }

  function onTabSelect(key){
    props.handleTabChange(key);
  }
}

ArtistInterfaceComponent.displayName = 'ArtistInterfaceComponent';

// Uncomment properties you need
// ArtistInterfaceComponent.propTypes = {};
// ArtistInterfaceComponent.defaultProps = {};

export default ArtistInterfaceComponent;
