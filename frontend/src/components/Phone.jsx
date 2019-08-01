import React, { Component } from 'react'
import {Form,Button,Divider,Message ,Label,Dropdown,Input} from 'semantic-ui-react'

import api from '../service/api'
import { isNullOrUndefined } from 'util';

const options= [
  { key: '91', text: '+91', value: '91' },
  { key: '99', text: '+99', value: '99' },

]

export default class App extends Component {
    
    constructor(props){
      super(props);
      this.state={
        number:'',
        country:'',
        pin:'',
        flag:true,
        err:'',
        msg:'',
      }
    }

    onChage = (e,data)=>{
      
      this.setState({
        [data.name]:data.value
      })
      
      
    }
     onSubmitPin= async()=>{
      const {number,country,pin}=this.state;
      const data ={
        pin,
        number:country+number
      }  

      const response = await api.call('post','/phone/verify',data);
      console.log(response.data);
      const{success,err,msg}=response.data;
      this.setState({
        msg:success?msg:'',
        err:!success?err:''
      })
      
    }
    onSubmitNumber= async()=>{
      const {number,country}=this.state;
      const patt1 = /[0-9]/g;
        const result = number.match(patt1);
        
        if(isNullOrUndefined(result) ||result.length!=10 ){
            return this.setState({
                err:'Invalid phone no'
            })
        }
        if(country==''){
          return this.setState({
            err:'Set country code'
          })
        }
        
      const data ={
        number:country+number
      }  
    
      const response = await api.call('post','/phone/sendOtp',data);
      console.log(response.data);
      const{success,err,msg}=response.data;
      this.setState({
        flag:false,
        msg:success?msg:'',
        err:!success?err:''
      })
    }

    Reset= ()=>{
      this.setState({
        number:'',
        pin:'',
        flag:true,
        msg:'',
        err:'',
      })
    }
    

  render() {
    const {flag,number,pin,msg,err}= this.state;
    console.log(this.state);
    
    return (
      <div className='form-container'>  
        <div>
        <Message  error hidden={err.length<1?true:false}
        header='Error'
        content={`${err}`}
        />
        <Message success  hidden={msg.length<1?true:false}
         header='Success' 
         content={`${msg}`} />
        <Form size={'massive'} >
          <Label size={'big'} >Phone no</Label>
        <Form.Group widths='thirteen'>
        
        <Input
        label={<Dropdown  defaultValue='' options={options} name='country' onChange={this.onChage}/>}
        labelPosition='left'
        name='number'  value={number} onChange={this.onChage} disabled={!flag}
        placeholder='Phone no'
        />
        </Form.Group>
        <Button basic color='black' disabled={!flag}
        onClick={this.onSubmitNumber} >Send OTP</Button>
        </Form>
        
        
        <Divider hidden />

        <Form size={'massive'} > 
        <Label size={'big'}>PIN</Label>
        <Form.Group widths='thirteen'>
        <Form.Input name='pin' placeholder='Pin' value={pin} onChange={this.onChage} disabled={flag} />        
        </Form.Group>
        <Button basic color='black' disabled={flag}
         onClick={this.onSubmitPin} >Verify</Button>
        </Form>
        <Divider hidden />

        <Button basic color='black' onClick={this.Reset}>Reset</Button>
        </div>
      </div>
    )
  }
}

