import React, { Component } from 'react';
import './App.css';
import ModHorario from './ModHorario';
import Solicitudes from './Solicitudes'

class App extends Component {
  render(){
    return (
      <div className="App">
        <Solicitudes />
      </div>
    )
  }
}
export default App;
