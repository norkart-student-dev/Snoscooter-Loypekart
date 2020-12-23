import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import NewPoiDialog from './components/NewPoiDialog';
import TrackDialog from './components/TrackDialog'
import { UserProvider } from './Context'
import SideMenu from './components/SideMenu';
import LoginDialog from './components/LoginDialog';
import ServerConnection from './ServerConnection';
import proj4 from 'proj4';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingPoi: null,
      currentLocation: { lat: 60.0084857, lng:11.0648648 },

      showLogin : false,
      currentUser : "",
      poi_data: [],
      track_data: [],
    };

    this.user = {
      loggedIn: false //should default to false in production version!
    }

    this.server = new ServerConnection();
    this.createPoi = this.createPoi.bind(this);
    this.editPoi = this.editPoi.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.splitTrack = this.splitTrack.bind(this);
    this.deletePoi = this.deletePoi.bind(this);
    this.openLoginDialog = this.openLoginDialog.bind(this);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.getPois().then(data => this.setState({poi_data: data}));
    this.getTracks().then(data => this.setState({track_data: data}));
    this.server.isLoggedIn().then(val => this.user.loggedIn = val);
  }

  componentDidUpdate() {
    this.server.isLoggedIn().then(val => this.user.loggedIn = val);
  }

  async handleLogin(username, password) {
    if(username === undefined || username === null || username ==="") {
      alert("Ingen brukernavn oppgitt, prøv igjen");
    }

    else if (password === undefined || password === null || password ==="") {
      alert("Ingen passord oppgitt, prøv igjen");
    }
    
    else {
      const loginResponse = await this.server.login(username, password);
      if(loginResponse.data === true) {
        this.setState(prevState => ({
          creatingPoi : prevState.creatingPoi,
          currentLocation : prevState.currentLocation,
          showLogin : false,
          currentUser : username
        }));
        this.user.loggedIn = true;
      }
      else if (loginResponse.data === "Allerede logget inn") {
        this.openLoginDialog();

      }
      else if(loginResponse.data === false) {
        alert("Feil brukernavn eller passord")
      }
      
      this.setState({}) //don't remove this: part of performance bugfix issue#21, required to allow contextmenu popup to appear
    }
  }

  async openLoginDialog() {
    if(this.user.loggedIn) {
      if(window.confirm("Du er allerede logget inn, trykk ok for å logge av")) {
        console.log("logging off");
        const logout = await this.server.logout();
        if (logout === true) {
          this.user.loggedIn = false;
          console.log("Logged off");
        } else {
          console.log("An error occured when setting ");
          this.user.loggedIn = false;
        }
        this.setState({}) //refresh after logout, prevents loggd out user from opening PoI popup
      }
    } else {
      this.setState({
        showLogin : true
      })
    }
  }

  async closeLoginDialog() {
    this.setState({
      showLogin : false
    })
  }

  render(){
    return(
      <UserProvider value={this.user}>
        <SideMenu
          openLoginMenu = {this.openLoginDialog}
          closeLoginDialog = {this.closeLoginDialog}
          currentUser = {this.state.currentUser}
        ></SideMenu>
        <Map 
          poi_data={this.state.poi_data}
          track_data={this.state.track_data} 
          createPoi={this.createPoi} 
          creatingPoi={this.state.creatingPoi} 
          editPoi={this.editPoi}
          deletePoi={this.deletePoi}
          editTrack={this.editTrack}
          splitTrack={this.splitTrack}
        />

        {this.state.creatingPoi && <NewPoiDialog 
          onDone={this.createPoi} 
          coords={this.state.creatingPoi}
          selectedPoi={{name:'', type:'Parkeringsplass'}}
        />}

        {this.state.editingPoi && <NewPoiDialog 
          onDone={this.editPoi} 
          selectedPoi={this.state.poi_data.filter((v) => (v._id===this.state.editingPoi))[0]}
        />}

        {this.state.editingTrack && 
          <TrackDialog
            onDone={this.editTrack}
            selectedTrack={this.selectedTrack}
          />}


        {this.state.showLogin &&
          <LoginDialog
            handleLogin={this.handleLogin}
            closeLoginDialog={this.closeLoginDialog}
            openLoginDialog={this.openLoginDialog}>
          </LoginDialog>
        }
      </UserProvider>
    );
  }

  // Request a list of all PoI's from the backend
  async getPois(){
    try{
      const res = await axios.get('/poi');

      let data = res.data;
      console.log(data)
      return(data);
    }
    catch(err) {
      alert("Det har oppstått et problem og punktdata kan desverre ikke vises, last inn siden eller prøv igjen senere.")
      return [];
    }
  }

  async getTracks() {
    try {
      const res = await axios.get('/tracks');

      let data = res.data;
      console.log(res.data)
      return(data);
    }
    catch(err) {
      console.log(err);
      alert("Det har oppstått et problem og løypedata kan desverre ikke leses av, last inn siden på nytt eller prøv igjen senere.")
      return [];
    }
  }

  async deletePoi(id) {
    const res = await axios.delete('/poi/' + id);
    if(res.status === 201){
      const data = await this.getPois();
      this.setState({poi_data: data})
    }
    else if(res.status === 403) {
      alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
    } else {
      alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
    }
  }

  // Value is either null or the id of the point that was clicked
  async editPoi(value, data){
    this.setState({editingPoi: value})
    if (value !== null){
      this.setState({selectedPoi: value})
    }

    if(data !== undefined){
      const res = await axios.patch('/poi/' + this.state.selectedPoi, data);
      if(res.status === 201) {
        const data = await this.getPois();
        this.setState({poi_data: data})
      }
      else if(res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      } else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    }
  }

  // Controls wether we are currently making a new PoI and passes data to the backend when done
  // value is either null or an array with latitude, longitude
  async createPoi(value, data){
    this.setState({creatingPoi: value})

    if(data !== undefined){
      const res = await axios.post('/poi', data);
      if(res.status === 201) {
        const data = await this.getPois();
        this.setState({poi_data: data})
      }
      else if(res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      } else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    }
  }

  // Value is either null or the id of the track that was clicked
  async editTrack(value, data){
    if (value !== null){
      this.setState({
        editingTrack: value,
        selectedTrack: value})
    } else {
      this.setState({editingTrack: value})
    }

    if(data !== undefined) {
      const res = await axios.patch('/tracks/' + this.state.selectedTrack, data);
      if(res.status === 201){
        const data = await this.getTracks();
        this.setState({track_data: data})
      }
      else if(res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      } else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    }
  }

  async splitTrack(item, coords){
    let current = null;

    item.geometry.coordinates.forEach(element => {
      let converted = proj4(
        '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs ', 
        '+proj=longlat +datum=WGS84 +no_defs ', 
        element);
      converted = [converted[1], converted[0]]
      let convertedCurr = proj4(
        '++proj=utm +zone=32 +datum=WGS84 +units=m +no_defs ', 
        '+proj=longlat +datum=WGS84 +no_defs ', 
        current);
        convertedCurr = [convertedCurr[1], convertedCurr[0]]
      if(current === null){
        current = element
      } else if(this.calcCrow(converted[0], converted[1], coords.lat, coords.lng) < this.calcCrow(convertedCurr[0], convertedCurr[1], coords.lat, coords.lng)) {
        current = element
      }
    });

    const res = await axios.patch('/tracks/split/' + item._id + '/' + current)
    console.log(res.data)
    if (res.status === 201) {
      const data = await this.getTracks();
      this.setState({track_data: data})
    }
    else if(res.status === 403) {
      alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
    } else {
      alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
    }
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) 
  {
      return Value * Math.PI / 180;
  }
}

export default App;
