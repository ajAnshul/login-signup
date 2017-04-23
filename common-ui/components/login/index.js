import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookie';
require("../../css/styles.css");

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
    cookie.remove('auth_cookie');
    cookie.remove('userid');
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object
    }
  }

  handleInputChange(event){
  var obj = this.state.data;
  var name = event.target.name;
  obj[event.target.name] = event.target.value;
  this.setState({data:obj});
  console.log(obj);
}

facebook(){
  console.log("under facebook auth");
  $.ajax({
    type:"GET",
    url:"/auth/facebook",
    success:function(data){
      console.log("got success from ajax-----------------");

    },
    error:function(e){
      console.log("got error form ajax");
    }
  })
}

handleSubmit(event){
  event.preventDefault();
  console.log("form submitted succefully");
  console.log(this.state.data);
  $.ajax({
    type:"POST",
    url:"/login",
    data:this.state.data,
    success:function(data){
      console.log("got success from ajax");
      console.log(data);
      var token = data.token
      cookie.save('auth_cookie',token,{path:'/'});
      cookie.save('userid',data.id,{path:'/'});
      this.props.history.push('/user')
    }.bind(this),
    error:function(e){
      console.log("got error form ajax");
    }
  })
}
  render(){
    return(
      <div>
      <div id="login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2> Login </h2>
          <label> Email</label>
          <input type="email" required placeholder="Email" name="email" onBlur={this.handleInputChange.bind(this)}  />
          <label>Password</label>
          <input type="password" required name="password" placeholder="Password" onBlur={this.handleInputChange.bind(this)}  />
          <input type="submit" value="Login" />
          <Link to={{pathname:'/signup'}} >
              <input type="button" value="Sign Up" />
          </Link>
          <input type="button" value="Facebook Login" onClick={this.facebook.bind(this)} />

        </form>
      </div>
      </div>
    )
  }
}
