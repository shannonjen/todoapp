import React, { Component } from 'react';
import SpotifySearchList from './SpotifySearchList.js'
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
      albums: []
    }
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
    <button onClick={() => this.getUserPlaylist()}>
           Get User playlist
           </button>
  }
}

export default SpotifySearch;
