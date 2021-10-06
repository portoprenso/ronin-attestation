import React, { Component } from 'react';

class ToDo extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: ["buy a milk", "throw a thrash from home"],
      addTodo: ""
    };
    this.addTodo = function (todo) {
      console.warn(this)
      this.setState({todos: [...this.state.todos, todo]})
    }
  }
  render() {
    return (
      <div>
        <input value={this.state.addTodo} onChange={e => this.setState({addTodo: e.target.value})}/>
        <button onClick={() => this.addTodo(this.state.addTodo)}>Add new todo</button>
        {this.state.todos ? this.state.todos.map(todo => <div key={todo}>{todo}</div>) : <></>}
      </div>
    );
  }
}

export default ToDo;