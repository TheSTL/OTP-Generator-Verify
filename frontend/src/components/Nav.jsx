import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import {Link,withRouter} from 'react-router-dom'



class Nav extends Component {
   constructor(props){
     super(props);
    
   }
   handleItemClick= ()=>{
     localStorage.clear();
     const {history}= this.props;
    history.push('/');
   }

  render() {
    const  activeItem  = this.props.location.pathname;
    const authoirzed= localStorage.auth?true:false;
    
    return (
      <Menu secondary>
        <Menu.Item as={Link} to='/'
        name='home' 
        active={activeItem === '/'}
          >
        </Menu.Item>

        { !authoirzed &&
        <Menu.Item as={Link} to='/login'
          name='admin'
          active={activeItem === '/login'}
          
        />
        }

        {
          authoirzed &&  
          <Menu.Item as={Link} to='/dashboard'
          name='dashboard'
          active={activeItem === '/dashboard'}
        />
        }

        {
          authoirzed &&  
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
        }
      </Menu>
    )
  }
}

export default withRouter(Nav);