import React from 'react';
import {Link} from 'react-router-dom';
require("../../css/styles.css");
import {addPersonalInfo} from '../../actions/personal_info.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
  }
  handleInputChange(event){
  var obj = this.state.data;
  var name = event.target.name;
  obj[event.target.name] = event.target.value;
  this.setState({data:obj});
  console.log(obj);
}

handleSubmit(event){
  event.preventDefault();
  console.log("form submitted succefully");
  console.log(this.state.data);
  var that = this;
  $.ajax({
    type:"POST",
    url:"/signup",
    data:this.state.data,
    success:function(data){
      console.log("got success from ajax");
      console.log(data);
      that.props.addPersonalInfo(data)
      that.props.history.push('/user')

    },
    error:function(e){
      console.log("got error form ajax");
    }
  })

}
  render(){
    return(
      <div>
        <div id="signup">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2> Sign up </h2>
            <label>Name</label>
            <input type="text" required name="name" placeholder="Name" onBlur={this.handleInputChange.bind(this)} />
            <label> Email</label>
            <input type="email" required name="email" placeholder="Email" onBlur={this.handleInputChange.bind(this)} />
            <label>Password</label>
            <input type="password" required name="password" placeholder="Password" onBlur={this.handleInputChange.bind(this)} />
            <label>Genger</label>
            <select id="gender" name="gender" onBlur={this.handleInputChange.bind(this)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="submit" value="Sign up" />
            <Link to={{pathname:'/login'}} >
                <input type="button" value="Login" />
            </Link>
          </form>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
        personal_info: state.personal_info
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators({addPersonalInfo: addPersonalInfo}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
