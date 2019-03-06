import React from 'react';
import { Table } from 'reactstrap';
  


    export default class Comments extends React.Component  {
        constructor(props){
            super(props)
        }
        
        render(){
        
console.log(this.props.comments, this.props.users)

            return (
                <div>
                  <Table size="sm">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* <tr>
                            {this.props.users.filter(user => this.props.comments.map(comment => comment.user_id === user.id)).map(user => (
                                <td>{user.name}</td>
                            ))}
                        </tr> */}
                        <tr>
                            {this.props.comments.map(comment=> (
                                this.props.users.filter(user => comment.user_id === user.id).map(user => (
                                    // <tr>
                                    <td>{user.name} {comment.content}   </td>
                                    // <td> </td>
                                    // </tr>
                                ))
                           
                            
                            ))}
                        
                        </tr>
                       
                        </tbody>
                    </Table> 
                            
                </div>
              );

        }
        
      };
      
    