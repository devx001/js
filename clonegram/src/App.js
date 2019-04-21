import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import FileUploadFirebase from './FileUploadFirebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} Ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(() => console.log("Ha salido..."))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    if (this.state.user) {
      return (
        <div>
          <img width="200" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button className="btn btn-danger" onClick={this.handleLogout}>Salir</button>
          <FileUploadFirebase />
        </div>
      )
    } else {
      return <button className="btn btn-primary" onClick={this.handleAuth}>Login</button>
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CLONEGRAM</h1>
          {this.renderLoginButton()}
        </header>
      </div>
    );
  }
}

export default App;
