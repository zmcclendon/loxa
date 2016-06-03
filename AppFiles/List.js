import React from 'react';
import ReactDOM from 'react-dom'
import Item from './Item';

class TodoList extends React.Component{
  constructor(){
    super();

    this.removeItem = this.removeItem.bind(this)
    this.favoriteItem = this.favoriteItem.bind(this)
  }
  removeItem(task){
    this.props.onRemove(task)
  }

  favoriteItem(task){
    this.props.onFavorite(task)
  }

  render(){
    var createItem = this.props.tasks.map((task) => {
      if(this.props.favoriteList === true){
        if(task.isFavorite==false){
          return null;
        }
      }
      return(
        <TodoItem key={task.id} task={task} itemRemove={this.removeItem} favoriteToggle={this.favoriteItem}>{task.text}</TodoItem>
      )
    });
    return(
      <div>
        <ul>{createItem}</ul>
      {createItem.length}
      </div>
    )
  }
}
