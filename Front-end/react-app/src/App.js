import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import ModHorario from './ModHorario';
import Formproveedor from './Formproveedor';
   


    const App = () => (
      <div className='app'>
        <h1>Applicacion para agendar servicios</h1>
        <Navigation />
        <Main />
      </div>
    );
    const Navigation = () => (
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>Modificar Horarios</NavLink></li>
          <li><NavLink to='/contact'>Agregar Proveedor</NavLink></li>
        </ul>
      </nav>
    );
    const Home = () => (
      <div className='home'>
        <h1>Demostracion de interfaz</h1>
        <p> Seleccione una de las historias a probar.</p>
      </div>
    );
  
  
    const About = () => (
      <div className='about'>
        <h1>About Me</h1>
        <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
        <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
      </div>
    );
  
    const Contact = () => (
      <div className='contact'>
        <h1>Contact Me</h1>
        <p>You can reach me via email: <strong>hello@example.com</strong></p>
      </div>
    );
    const Main = () => (
      <div class="container">
      <div class="row">
      <div class="col-xs-3"></div>
          <div class="col-xs-6">
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/about' component={ModHorario}></Route>
        <Route exact path='/contact' component={Formproveedor}></Route>
      </Switch>
      </div>
      
      </div>
      </div>
    );

    export default App;