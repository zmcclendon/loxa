import React from 'react';
import ReactDOM from 'react-dom'

class TodoItem extends React.Component{
  constructor(){
    super();
    this.itemRemove = this.itemRemove.bind(this)
    this.favoriteToggle = this.favoriteToggle.bind(this)
  }
  itemRemove(task){
    this.props.itemRemove(this)
  }

  favoriteToggle(task){
    this.props.favoriteToggle(this)
  }
  render(){
    return(
      <div id="item">
        <li htmlFor={this.props.task.id}>{this.props.children}
            <button onClick={this.favoriteToggle} value={this.props.task.id}>√</button>
            <button onClick={this.itemRemove} value={this.props.task.id}>X</button>
        </li>
      </div>
    )
  }
}
