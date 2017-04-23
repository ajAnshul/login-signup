import React from 'react';
import cookie from 'react-cookie';
var $ = require ('jquery');

export default class DashBoard extends React.Component{
constructor(props){
  super(props);
  this.state={
      userid:cookie.load('userid'),
      Authorization:cookie.load('auth_cookie'),
      flag:0
  }
}
componentDidMount()
  {
    console.log("got call");
    console.log(this.state.Authorization)
    var auth = this.state.Authorization;
    $.ajax({
      type:"GET",
      url:"/user",
      headers: {"Authorization":auth},
      success:function(data){
        console.log("got success from ajax");
        this.setState({flag:1})
        console.log(this.state.flag);
      }.bind(this),
      error:function(e){
        console.log("got error form ajax");
      }
    })
  }
  render(){
  console.log("------------------")
  console.log(this.state.flag);
  if(!this.state.flag){
    return (
      <div>
        <h2>user is not autorised </h2>
      </div>
    )
  } else{
  return(
    <div>
      <h2> Welcome to Dashboard</h2>
    </div>
  )
  }
  }
}
