import React, { Component } from 'react';

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <li key={todo.task}>{todo.task}</li>
        ))}
      </ul>
    );
  }
}

export default TodoList;
