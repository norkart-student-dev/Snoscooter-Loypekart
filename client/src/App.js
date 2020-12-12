import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Mapview from './components/Map';
import SideMenu from './components/SideMenu';
import LoginDialog from './components/LoginDialog';
import ServerConnection from './ServerConnection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 60.0084857, lng:11.0648648 },
      showLogin : false,
    };

    this.server = new ServerConnection();

    this.toggleLoginDialog = this.toggleLoginDialog.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  componentDidMount() {
    this.getPois().then(data => this.setState({pois: data}));
  }

  async handleLogin(username, password) {
    const loginResponse = await this.server.login(username, password);
    console.log(loginResponse);
  }

  toggleLoginDialog() {
    let toggle = this.state.showLogin;
    this.setState(prevState => ({
      currentLocation : prevState.currentLocation,
      showLogin : !toggle
    }))
  }

  render(){
    return(
      <div>
        <SideMenu
          openLoginMenu = {this.toggleLoginDialog}
        ></SideMenu>

        {this.state.showLogin &&
          <LoginDialog handleLogin={this.handleLogin} hideLoginDialog={this.toggleLoginDialog}></LoginDialog>
        }

        <Mapview pois={this.state.pois}/>
        
      </div>
      
    );
  }

  async getPois(){
    const res = await axios.get('/poi');

    let data = res.data;
    return(data);
  }
}

export default App;
