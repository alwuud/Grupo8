import React, { Component } from 'react'
import axios from 'axios'
import Table, {flatten, unflatten} from 'tablex';
 class Solicitudes extends Component {
     constructor(props){
         super(props)

         this.state = {
             solicitudes: []
         }
     }

     componentDidMount(){
         axios.get('http://localhost:3001/proveedor/solicitud')
         .then(response => {
             console.log(response)
             this.setState({solicitudes: response.data})
         })
         .catch(error =>{
             console.log(error)
         })
     }

     sendData = () => {
         var a = document.getElementById("selection");
        this.props.parentCallback(a.options[a.selectedIndex].value);
   }
    render() {
        const{solicitudes} = this.state
        return (
            <div>
              <Table rowKey="solicitudes.id" data={this.state.solicitudes} />
            </div>
        )
    }
}

export default Solicitudes
