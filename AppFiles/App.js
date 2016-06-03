import React from 'react';
import ReactDOM from 'react-dom'
var Timeout;



class TodoApp extends React.Component{
  constructor(props, context){
    super(props,context);
    this.state={
      tasks: []
    }
    this.update = this.update.bind(this)
    this.add =this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.favorite = this.favorite.bind(this)
    this.focusInput = this.focusInput.bind(this)
  }
  focusInput(){
    ReactDOM.findDOMNode(this.refs.topLayer.refs.nameInput).focus();
  }
  add(task){
    this.setState({tasks: this.state.tasks.concat([task])});
    this.save()
    clearTimeout(Timeout);
    Timeout = setTimeout(this.focusInput,3000);
  }
  save(){
    localStorage.setItem('TodoList',JSON.stringify(this.state.tasks));
  }
  componentWillMount(){
    this.setState({tasks:JSON.parse(localStorage.getItem('TodoList'))})
  }

  update(task){
    this.setState({tasks:this.state.tasks})
    this.save();
    clearTimeout(Timeout);
    Timeout = setTimeout(this.focusInput,3000);
  }
  remove(task){
    var index;
    for(var i = 0;i<=this.state.tasks.length-1;i++){
        if(this.state.tasks[i].id==task.props.task.id){
          index = i;
        }
    }

    this.state.tasks.splice(index,1)
    this.setState({tasks:this.state.tasks})
    this.save()
    clearTimeout(Timeout);
    Timeout = setTimeout(this.focusInput,3000);
  }
  favorite(task){
    var index;
    for(var i = 0;i<=this.state.tasks.length-1;i++){
        if(this.state.tasks[i].id==task.props.task.id){
          index = i;
        }
    }
    this.state.tasks[index].isFavorite=!this.state.tasks[index].isFavorite
    this.setState({tasks:this.state.tasks})
    this.save();
    clearTimeout(Timeout);
    Timeout = setTimeout(this.focusInput,3000);
  }
  render(){
    return(
      <div>

          <TodoInput ref='topLayer' onFormSubmit={this.add}/>

        <div className="col-md-6">
          <h3>To Do List</h3>
          <TodoList tasks={this.state.tasks} onUpdateTask={this.update} onRemove={this.remove} onFavorite={this.favorite}/>
        </div>
        <div className="col-md-6">
          <h3>Favorites</h3>
          <TodoList favoriteList={true} tasks={this.state.tasks} onUpdateTask={this.update} onRemove={this.remove} onFavorite={this.favorite}/>
        </div>
      </div>
    )
  }
}


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
    var count = 0;
    var createItem = this.props.tasks.map((task) => {
      if(this.props.favoriteList === true){
        if(task.isFavorite==false){
          return null;
        }
      }
      count++
      return(
        <TodoItem key={task.id} task={task} itemRemove={this.removeItem} favoriteToggle={this.favoriteItem}>{task.text}</TodoItem>
      )
    });
    return(
      <div>
        <ul>{createItem}</ul>
       <p>Count: {count}</p>
      </div>
    )
  }
}
TodoList.propTypes = {
  favoriteList: React.PropTypes.bool
}
TodoList.defaultProps = {
  favoriteList: false
}





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


class TodoInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  handleSubmit(e){
    e.preventDefault();
    var task={
      id:Date.now(),
      text:this.state.text,
      read:false,
      isFavorite:false
    };
    this.props.onFormSubmit(task);
    this.setState({text: ''});
  };
  onChange(e){
    this.setState({ text: e.target.value});
  }
  render(){
    return(
      <form className="form-group" onSubmit={this.handleSubmit}>
        <input type='text' ref="nameInput" placeholder="Enter a new item" onChange={this.onChange} value={this.state.text} autofocus/>
      </form>
    )
  }
}



ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
