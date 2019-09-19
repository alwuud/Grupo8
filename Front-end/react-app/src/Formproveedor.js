import React, {Component} from 'react'
import axios from 'axios'
import CurrentHorarioDropDown from './CurrentHorarioDropDown';

class ModHorario extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             id_horario: '',
             title: '',
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
            .post('http://localhost:3001/cliente/mod_schedule/:id',this.state)
        	.then(response => {
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }
  
    render(){
        const{title} =  this.state
        return (
            <div>
                 <br></br><br></br><br></br>
                <form onSubmit={this.submitHandler}>
                    
                <div> 
                    Ingrese el nombre:
                    <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese el apellido:<br></br>
                <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default ModHorario