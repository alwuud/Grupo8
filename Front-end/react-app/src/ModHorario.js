import React, {Component} from 'react'
import axios from 'axios'
import './App.css';
import GetHorario from './GetHorario';
import CurrentHorarioDropDown from './CurrentHorarioDropDown';
class ModHorario extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             id_horario: '',
             id_new: ''
        }
    }

    
    
    changeHandler= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler= (e) => {
       e.preventDefault()
       console.log(this.state)
       axios
            .post('http://localhost:3001/cliente/mod_schedule',this.state)
        	.then(response => {
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    callbackFunction = (childData) => {
        this.setState({id_horario: childData})
  }
  returnCallback = (childData) => {
    this.setState({id_new: childData})
}
    render(){
        const{title} =  this.state
        return (
            <div id="main-nav">
                 <br></br><br></br><br></br>
                <form onSubmit={this.submitHandler}>
                    
                <div> 
                    Seleccione el horario a cambiar:
                <CurrentHorarioDropDown parentCallback ={this.callbackFunction}/>
                </div>
                <br></br>
                <div> 
                    Seleccione el horario nuevo:
                    <GetHorario parentCallback ={this.callbackFunction}/>
                </div>
                
                <br></br>
                <button class="button" type="submit" >Submit</button>
                </form>
            </div>
        )
    }
}
export default ModHorario