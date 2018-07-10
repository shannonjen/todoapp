import React, { Component } from 'react';
//import SpotifySearchList from './SpotifySearchList.js'
import Spotify from 'spotify-web-api-js';

var s = new Spotify();

class SpotifySearch extends Component {

  constructor(props){
    super(props)
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      s.setAccessToken(token)
    }

    this.state = {
      error: null,
      loggedIn: token ? true : false,
      artists: [],
      artistText: ''
    }

    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.searchArtists = this.searchArtists.bind(this);
  }

  handleArtistChange(e) {
    this.setState({ artistText: e.target.value })
  }
  searchArtists(e) {
    e.preventDefault();

    if(!this.state.artistText.length) {
      return;
    }
    const search = this.state.artistText;
    s.searchArtists(search)
    .then(function(data){
      console.log('artists data', data)
    }, function(err) {
      console.log(err)
    })
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getUserPlaylist() {
    s.getUserPlaylists('jenshannon')
    .then(function(data) {
      console.log('User playlists', data)
    }, function(err) {
      console.error(err);
    })
  }

  render() {
    return (

      <form onSubmit={this.searchArtists}>
        <input id="newartist" onChange={this.handleArtistChange} value={this.state.artistText} />
        <button> Search Artists </button>
      </form>

  )}
}

export default SpotifySearch;
