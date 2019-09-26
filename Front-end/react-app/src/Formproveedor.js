import React, {Component} from 'react'
import axios from 'axios'
import CurrentHorarioDropDown from './CurrentHorarioDropDown';

class Formproveedor extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             passwd: '',
             nombres: '',
             apellidos: '',
             email: '',
             categoria: ''
        }
    }

    
    
    changeHandler= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler= (e) => {
       e.preventDefault()
       console.log(this.state)
       axios
            .post('http://localhost:3001//proveedor/registry',this.state)
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
                    Ingrese el nombre de usuario:
                    <br></br>
                    <input type = "text" name= "username" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese una contraseña:
                    <br></br>
                    <input type = "password" name= "passwd" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese su nombre:
                    <br></br>
                    <input type = "text" name= "nombres" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese su apellido:<br></br>
                <input type = "text" name= "apellidos" value={title} onChange={this.changeHandler}></input>
                </div>
                
                <br></br>
                <div> 
                    Ingrese el email:<br></br>
                <input type = "text" name= "email" value={title} onChange={this.changeHandler}></input>
                </div>
                
                <br></br>
                <div> 
                   Seleccione una categoria:
                   <br>
                   </br>
                    <input type = "text" name= "categoria" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <button class="button"  type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default Formproveedor