import React from 'react'
import { Table } from 'semantic-ui-react'

const uniqueNo= (array)=>{
        
    return (<Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mobile No</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {
             array.map((data,i)=>{
                 return (
                < Table.Row key={i}>
                    <Table.Cell >{data.mobileNo}</Table.Cell>
                </Table.Row>
                 )
             })   
            }
        </Table.Body>
      </Table>)
}
const list= (array)=>{
        
    return (<Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mobile No</Table.HeaderCell>
            <Table.HeaderCell>Total SMS send</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {
             array.map((data,i)=>{
                 return (
                < Table.Row key={i}>
                    <Table.Cell  >{data.mobileNo}</Table.Cell>
                    <Table.Cell >{data.count}</Table.Cell>
                    <Table.Cell >{data.verified}</Table.Cell>
                </Table.Row>
                 )
             })   
            }
        </Table.Body>
      </Table>)
}

export {
    list,
    uniqueNo
}