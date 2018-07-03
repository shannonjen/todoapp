import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';


class Todo extends Component {
  render(){
    return(
    <Row>
      <Input placeholder="Placeholder" s={6} label="First Name" />
      <Input s={6} label="Last Name" />
      <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
      <Input type="password" label="password" s={12} />
      <Input type="email" label="Email" s={12} />
    </Row>
    )
  }
}

export default Todo;
