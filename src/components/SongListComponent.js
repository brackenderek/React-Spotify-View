'use strict';

import React from 'react';
import Table from 'react-bootstrap/lib/Table';

require('styles//SongList.css');

let SongListComponent = function(props){
  return (
    <Table className="list-song" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Song Name</th>
          <th>Duration</th>
          <th>Artists</th>
          <th>Album</th>
          <th>Track</th>
          <th>Disc Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
        props.list.map(function(item,index){
          let artists = '';
          for(var i = 0; i < item.artists.length; i++){
            if(i == item.artists.length - 1){
              artists += item.artists[i].name;
            }
            else{
              artists += item.artists[i].name + ', ';
            }
          }
          return (
            <tr key={item.id}>
              <td>{pad(index + 1)}</td>
              <td className="song-title">{item.name}</td>
              <td>{millisToMinutesAndSeconds(item.duration_ms)}</td>
              <td>{artists}</td>
              <td>{item.album ? item.album.name : props.albumName}</td>
              <td>{item.track_number}</td>
              <td>{item.disc_number}</td>
              <td>{item.explicit && 'Explicit'}</td>
            </tr>
          );
        })
      }
      </tbody>
    </Table>
  );

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }

  function pad(n) {
      return (n < 10) ? ('0' + n + '.') : n + '.';
  }
}

SongListComponent.displayName = 'SongListComponent';

// Uncomment properties you need
// SongListComponent.propTypes = {};
// SongListComponent.defaultProps = {};

export default SongListComponent;
