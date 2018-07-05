import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';


class Todo extends Component {

  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      todos: []
    };
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
  render() {
     const { error, isLoaded, todos } = this.state;
     if (error) {
       return <div>Error: {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
       return (
         <ul>
           {todos.map(todo => (
             <li key={todo.task}>
               {todo.task} {todo.created_at}
             </li>
           ))}
         </ul>
       );
     }
   }
}

export default Todo;
