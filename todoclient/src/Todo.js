import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import TodoList from './TodoList.js'


class Todo extends Component {

  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      todos: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
            <button> Add #{this.state.todos.length + 1}</button>
          </form>
         </div>
       );
     }
   }
}

export default Todo;
