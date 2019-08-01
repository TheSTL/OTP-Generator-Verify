import React, { Component } from 'react'
import {Form,Button,Divider,Message,Label } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

import api from '../service/api'

 class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            err:''
        }
    }
    onChage = (e)=>{
        this.setState({
          [e.target.name]:e.target.value
        })
      }
      onSubmit = async(e)=>{
          e.preventDefault();
          const response = await api.call('post','/admin/login',this.state);
          console.log(response.data);
          const{success,err}= response.data;
          if(success){
              const {history}= this.props;
              localStorage.setItem('auth',true);
              history.push('/dashboard');
          }
          this.setState({
            err:!success?err:''
          })
          
      }

    render() {
        
        const{username,password,err }= this.state;

        return (
            <div className='form-container'>  
        <div>
        <Message  error hidden={err.length<1?true:false}
        header='Error'
        content={`${err}`}
        />
        <Form size={'big'} onSubmit={this.onSubmit}  >
        <Label>Username</Label>
        <Form.Group widths='thirteen'>
        <Form.Input  name='username' placeholder='Username' value={username}  onChange={this.onChage}  />
        </Form.Group>
        <Divider hidden />

         <Label>Password </Label>
        <Form.Group widths='thirteen'>
        <Form.Input input='password' name='password' placeholder='Password' value={password} onChange={this.onChage}  />        
        </Form.Group>
        <Button>Submit</Button>
        </Form>
            </div>
            </div>
        )
    }
}

export default  withRouter(LoginPage);