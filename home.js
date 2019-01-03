import React from 'react'
class Dashboard extends React.Component{
    Constructor(){
        super();
        this.state={
            arr:'[]',
            matching:''
        }
    }
    handleChange(value){
     this.setState({bloodgroup: value , matching:[]});   
    }
}