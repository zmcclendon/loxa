import React from 'react';
import ReactDOM from 'react-dom'

class TodoInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
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
      <form onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.onChange} value={this.state.text}/>
      </form>
    )
  }
}
