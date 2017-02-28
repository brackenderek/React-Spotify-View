require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import SearchInput from './SearchInputComponent';
import ArtistInterface from './ArtistInterfaceComponent';
import Grid from 'react-bootstrap/lib/Grid'

class AppComponent extends React.Component {
  
  constructor(props){
    super(props);
    this.updateSearchVal = this.updateSearchVal.bind(this);
    this.performSearchBarSearch = this.performSearchBarSearch.bind(this);
    this.newArtistSearch = this.newArtistSearch.bind(this);
    this.getArtistInfo = this.getArtistInfo.bind(this);
    this.getBothRelatedAndAlbums = this.getBothRelatedAndAlbums.bind(this);
    this.getRelatedArtists = this.getRelatedArtists.bind(this);
    this.getArtistsAlbums = this.getArtistsAlbums.bind(this);
    this.doFetch = this.doFetch.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setCurrentAlbum = this.setCurrentAlbum.bind(this);
    this.setCurrentTracks = this.setCurrentTracks.bind(this);
    this.state = {
      searchVal: '',
      artistSet: false,
      initialSearch: false,
      name: '',
      followers: 0,
      genres: [],
      imageUrl: '',
      href: '',
      id: '',
      alternateSuggestions: [],
      topTen: [],
      relatedArtists: [],
      albums: [],
      showSpinner: false,
      tabKey: 1,
      currentAlbum: [],
      currentAlbumTracks: [],
      currentAlbumTracksReceived: false,
      currentAlbumLabel: '',
      currentAlbumReleaseDate: ''
    };
  }
  
  updateSearchVal(e){
    this.setState({searchVal:e.target.value})
  }

  // executes when user hits enter on search bar
  performSearchBarSearch(){
    var self = this;
    if(self.state.searchVal.length > 0){
      this.setState({
        showSpinner: true,
        relatedArtists: [],
        albums: [],
        tabKey: 1
      },setUrlForFetch);
    }
    function setUrlForFetch(){
      var url = 'https://api.spotify.com/v1/search?q=' + self.state.searchVal + '&type=artist&limit=5';
      this.getArtistInfo(url,false);
    }
  }

  // executes when user selects artist from list of artists
  newArtistSearch(url){
    var self = this;

    this.setState({
      showSpinner: true,
      relatedArtists: [],
      albums: [],
      currentAlbum: [],
      currentAlbumTracks: [],
      currentAlbumTracksReceived: false,
      currentAlbumLabel: '',
      currentAlbumReleaseDate: '',
      tabKey: 1
    },setUrlForFetch);

    function setUrlForFetch(){
      self.getArtistInfo(url,true);
    }
  }

  // gets all the info relating to the artist
  getArtistInfo(url,artistEndPoint){
    var self = this;
    self.doFetch(url).then(function(artistData){
      if(artistEndPoint){
        self.doFetch('https://api.spotify.com/v1/artists/' + artistData.id + '/top-tracks?country=US&limit=10').then(function(tracksData){
          self.setState({
            artistSet: true,
            initialSearch: true,
            name: artistData.name,
            followers: artistData.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            genres: artistData.genres,
            imageUrl: artistData.images.length > 0 ? artistData.images[0].url : '',
            href: artistData.href,
            id: artistData.id,
            alternateSuggestions: [],
            topTen: tracksData.tracks.length > 0 ? tracksData.tracks : [],
            showSpinner: false
          },self.getBothRelatedAndAlbums);
        });
      }else{
        if(artistData.artists.items.length > 0){
          let mainArtist = artistData.artists.items.shift();
          self.doFetch('https://api.spotify.com/v1/artists/' + mainArtist.id + '/top-tracks?country=US&limit=10').then(function(tracksData){
            self.setState({
              artistSet: true,
              initialSearch: true,
              name: mainArtist.name,
              followers: mainArtist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              genres: mainArtist.genres,
              imageUrl: mainArtist.images.length > 0 ? mainArtist.images[0].url : '',
              href: mainArtist.href,
              id: mainArtist.id,
              alternateSuggestions: artistData.artists.items,
              topTen: tracksData.tracks.length > 0 ? tracksData.tracks : [],
              showSpinner: false
            },self.getBothRelatedAndAlbums);
          });
        }else{
          self.setState({
            artistSet: false,
            initialSearch: true,
            name: '',
            followers: 0,
            genres: [],
            imageUrl: '',
            href: '',
            id: '',
            alternateSuggestions: [],
            topTen: [],
            relatedArtists: [],
            albums: [],
            showSpinner: false,
            tabKey: 1,
            currentAlbum: [],
            currentAlbumTracks: [],
            currentAlbumTracksReceived: false,
            currentAlbumLabel: '',
            currentAlbumReleaseDate: ''
          });
        }
      }
    });
  }

  // fetches an artists albums and a list of related artists
  getBothRelatedAndAlbums(){
    var self = this;
    self.getRelatedArtists().then(function(relData){
      self.getArtistsAlbums().then(function(albData){
        self.setState({
          relatedArtists: relData.artists,
          albums: albData.items,
          currentAlbum: albData.items.length > 0 ? [albData.items[0]] : [],
          currentAlbumTracks: [],
          currentAlbumTracksReceived: false,
          currentAlbumLabel: '',
          currentAlbumReleaseDate: ''
        });
      });
    });
    
  }

  getRelatedArtists(){
    var url = this.state.href + '/related-artists';

    return this.doFetch(url);
  }

  getArtistsAlbums(){
    var url = this.state.href + '/albums?album_type=album&market=US';

    return this.doFetch(url);
  }

  // actual fetch call that transforms results into json and returns it
  doFetch(url){
    return fetch(url).then((resp) => resp.json());
  }

  // update state on tab change
  handleTabChange(key){
    this.setState({tabKey: key});
  }

  // set the current album, while resetting the other correlated props in state object
  setCurrentAlbum(obj){
    this.setState({
      currentAlbum: [obj],
      currentAlbumTracks: [],
      currentAlbumTracksReceived: false,
      currentAlbumLabel: '',
      currentAlbumReleaseDate: ''
    });
  }

  // setting the correlating props of the current album
  setCurrentTracks(url){
    var self = this;
    self.doFetch(url).then(function(data){
      self.setState({
        currentAlbumTracksReceived: true,
        currentAlbumLabel: data.label,
        currentAlbumReleaseDate: data.release_date,
        currentAlbumTracks: data.tracks.items
      })
    });
  }

  render() {
    return (
      <div>
        {this.state.showSpinner && <span className="spinner"></span>}
        <div className={this.state.initialSearch ? 'masthead clearfix' : 'masthead clearfix masthead-initial'}>
          <h3 className="masthead-brand"><img src="./images/Spotify_Logo_RGB_Green.png"/></h3>
          <SearchInput performSearchBarSearch={this.performSearchBarSearch} updateSearchVal={this.updateSearchVal} stateObj={this.state} />
        </div>
        <div className="mastbody">
          <Grid>
            {(!this.state.artistSet && this.state.initialSearch) && <p className="no-matches">We could not find any matches. Please search a different term.</p>}
            {
              this.state.artistSet
              &&
              <ArtistInterface
                stateObj={this.state}
                handleTabChange={this.handleTabChange}
                newArtistSearch={this.newArtistSearch}
                setCurrentAlbum={this.setCurrentAlbum}
                getTracks={this.setCurrentTracks} />
            }
            {
              !this.state.initialSearch
              &&
              <div className="find-artist">
                <h1>Artist Finder</h1>
                <p>Use the search bar above to find information about an artist including genres, followers, top ten songs on Spotify, albums, and related artists. You can also play 30 second sound clips from each song listed for the artist.</p>
              </div>
            }
          </Grid>
        </div>
        <div className="mastfoot">
          <p>Disclaimer: This application is strictly for personal use. The view is built with React and it uses the <a href="https://www.spotify.com/us/">Spotify</a> API to get it's content.</p>
        </div>
      </div>
    );
  }
}

export default AppComponent;

    
           