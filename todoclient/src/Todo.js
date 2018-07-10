import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import TodoList from './TodoList.js'
import SpotifySearch from './SpotifySearch.js'
import Spotify from 'spotify-web-api-js';

var s = new Spotify();

class Todo extends Component {

  constructor(props){
    super(props)
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      s.setAccessToken(token)
    }

    this.state = {
      error: null,
      isLoaded: false,
      loggedIn: token ? true : false,
      todos: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  getUserPlaylist(){
    s.getUserPlaylists('jenshannon')
    .then(function(data) {
      console.log('User playlists', data);
    }, function(err) {
      console.error(err);
    });
  }

  componentDidMount() {
    console.log("THis is all good")
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            todos: result
          });
          console.log(this.state)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )

  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newTodo = {
      task: this.state.text,
    };
    this.setState(prevState => ({
      todos: prevState.todos.concat(newTodo),
      text: ''
    }));
    fetch('http://localhost:3001/todos',{
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
     const { error, isLoaded, todos } = this.state;
     if (error) {
       return <div>Error: {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
       return (
         <div>
          <h3>Todo</h3>
          <TodoList todos={this.state.todos} />
          <form onSubmit={this.handleSubmit}>
            <input id="new-todo" onChange={this.handleChange} value={this.state.text} />
            <button> Add Todo</button>
          </form>

         <a href="http://localhost:3001/login">Log in to Spotify</a>

         <div>
         { this.state.loggedIn &&

          <SpotifySearch />
         }
         </div>
        </div>

       );
     }
   }
}

export default Todo;
