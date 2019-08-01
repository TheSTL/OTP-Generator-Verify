import React, { Component } from 'react'
import { Menu} from 'semantic-ui-react'
import {list,uniqueNo} from '../components/UniqueNo'

import api from '../service/api'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            activeItem: 'countUniqueNo'
        }
    }
    async componentDidMount(){
        const response1= await api.call('get','/admin/countUniqueNo');
        const response2= await api.call('get','/admin/countTotalSms');
        const response3= await api.call('get','/admin/listUniqueNo');
        const response4= await api.call('get','/admin/list');
    
        const data1= <span >{`Count Unique No : ${response1.data}`}</span>
        const data2=  <span >{`Total SMS send : ${response2.data}`}</span>
        const data3 = uniqueNo(response3.data);
        const data4= list(response4.data)
        this.setState({
            data1,
            data2,
            data3,
            data4
        })


    }
    
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    show = ()=>{
        const { activeItem,data1,data2,data3,data4 } = this.state
        return (activeItem==='countUniqueNo' && data1) ||
        (activeItem==='countTotalSms' && data2) ||
        (activeItem==='listUniqueNo' && data3) ||
        (activeItem==='list' && data4 )
    }


    render() {
      const { activeItem } = this.state
        console.log(this.state);
        
      return (
          <div>
        <Menu tabular>
          <Menu.Item name='countUniqueNo' active={activeItem === 'countUniqueNo'} onClick={this.handleItemClick} />
          <Menu.Item name='countTotalSms' active={activeItem === 'countTotalSms'} onClick={this.handleItemClick} />
          <Menu.Item name='listUniqueNo' active={activeItem === 'listUniqueNo'} onClick={this.handleItemClick} />
          <Menu.Item name='list' active={activeItem === 'list'} onClick={this.handleItemClick} /> 
        </Menu>
        <div className='data-container'>
        <div className='data'>
            { this.show()   }
        </div>
        </div>
        </div>
      )
    }
}
