import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import NewPoiDialog from './components/NewPoiDialog';
import TrackDialog from './components/TrackDialog'
import { UserProvider } from './Context'
import SideMenu from './components/SideMenu';
import LoginDialog from './components/LoginDialog';
import { isLoggedIn } from './ServerConnection';
import proj4 from 'proj4';
import booleanContains from '@turf/boolean-contains';

function App() {
  const [creatingPoi, setCreatingPoi] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 60.0084857, lng: 11.0648648 });
  const [showLogin, setShowLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [poiData, setPoiData] = React.useState([]);
  const [trackData, setTrackData] = React.useState([]);
  const [editingTrack, setEditingTrack] = React.useState(false);
  const [selectedTracks, setSelectedTracks] = React.useState([]);
  const [drawing, setDrawing] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    isLoggedIn().then(val => setLoggedIn(val));
  })
  /*
  componentDidUpdate() {
    this.server.isLoggedIn().then(val => this.user.loggedIn = val);
  }
  */

  return (
    <>
      <SideMenu
        openLoginMenu={openLoginDialog}
        closeLoginDialog={closeLoginDialog}
        setDrawing={setDrawing}
        forceReloadDB={forceReloadDB}
      ></SideMenu>
      <Map
        createPoi={createPoi}
        creatingPoi={creatingPoi}
        editPoi={editPoi}
        movePoi={movePoi}
        deletePoi={deletePoi}
        editTrack={editTrack}
        deleteTrack={deleteTrack}
        splitTrack={splitTrack}
        onSelectionUpdate={selectTracks}
        selectedTracks={selectedTracks}
        drawing={drawing}
      />

      {creatingPoi && <NewPoiDialog
        onDone={createPoi}
        coords={creatingPoi}
        selectedPoi={{ name: '', type: 'Parkeringsplass' }}
      />}

      {editingTrack &&
        <TrackDialog
          onDone={editTrack}
          selectedTracks={selectedTracks}
        />}


      {showLogin &&
        <LoginDialog
          handleLogin={handleLogin}
          closeLoginDialog={closeLoginDialog}
          openLoginDialog={openLoginDialog}>
        </LoginDialog>
      }
    </>
  );

  async function handleLogin(username, password) {
    if (username === undefined || username === null || username === "") {
      alert("Ingen brukernavn oppgitt, prøv igjen");
    }

    else if (password === undefined || password === null || password === "") {
      alert("Ingen passord oppgitt, prøv igjen");
    }

    else {
      const loginResponse = await this.server.login(username, password);
      if (loginResponse.data === true) {
        this.setState(prevState => ({
          creatingPoi: prevState.creatingPoi,
          currentLocation: prevState.currentLocation,
          showLogin: false,
          currentUser: username
        }));
        this.user.loggedIn = true;
      }
      else if (loginResponse.data === "Allerede logget inn") {
        this.openLoginDialog();

      }
      else if (loginResponse.data === false) {
        alert("Feil brukernavn eller passord")
      }

      this.setState({}) //don't remove this: part of performance bugfix issue#21, required to allow contextmenu popup to appear
    }
  }

  async function openLoginDialog() {
    if (this.user.loggedIn) {
      if (window.confirm("Du er allerede logget inn, trykk ok for å logge av")) {
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
        showLogin: true
      })
    }
  }

  async function closeLoginDialog() {
    this.setState({
      showLogin: false
    })
  }



  // async getTracksSource(){
  //   try {
  //     const res = await axios.get('/tracks/source');

  //     let data = res.data;
  //     console.log(res.data)
  //     return(data);
  //   }
  //   catch(err) {
  //     console.log(err);
  //     alert("Det har oppstått et problem og løypedata kan desverre ikke leses av, last inn siden på nytt eller prøv igjen senere.")
  //     return [];
  //   }
  // }

  async function deletePoi(id) {
    const res = await axios.delete('/poi/' + id);
    if (res.status === 201) {
      const data = await this.getPois();
      this.setState({ poi_data: data })
    }
    else if (res.status === 403) {
      alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
    } else {

      alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
    }
  }

  async function deleteTrack(id) {
    try {
      const res = await axios.delete('/tracks/' + id);
      if (res.status === 201) {
        const data = await this.getTracks();
        this.setState({ track_data: data })
      }
      else if (res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      }
      else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  // Value is either null or the id of the point that was clicked
  async function editPoi(value, data) {
    this.setState({ editingPoi: value })
    if (value !== null) {
      this.setState({ selectedPoi: value })
    }

    if (data !== undefined) {
      const res = await axios.patch('/poi/' + this.state.selectedPoi, data);
      if (res.status === 201) {
        const data = await this.getPois();
        this.setState({ poi_data: data })
      }
      else if (res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      } else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    }
  }

  async function movePoi(id, latlng) {
    let data = {
      "location": {
        "type": "Point",
        "coordinates": [latlng.lat, latlng.lng]
      }
    }

    const res = await axios.patch('/poi/' + id, data);
    if (res.status === 201) {
      const data = await this.getPois();
      this.setState({ poi_data: data })
    }
    else if (res.status === 403) {
      alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
    } else {
      alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
    }
  }

  // Controls wether we are currently making a new PoI and passes data to the backend when done
  // value is either null or an array with latitude, longitude
  async function createPoi(value, data) {
    this.setState({ creatingPoi: value })

    if (data !== undefined) {
      const res = await axios.post('/poi', data);
      if (res.status === 201) {
        const data = await this.getPois();
        this.setState({ poi_data: data })
      }
      else if (res.status === 403) {
        alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
      } else {
        alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
      }
    }
  }

  // Value is either null or the id of the track that was clicked
  async function editTrack(selected, data) {
    if (selected.length !== 0) {
      this.setState({
        editingTrack: true,
        selectedTracks: selected
      });
    } else {
      this.setState({
        editingTrack: false,
        selectedTracks: selected
      });
    }
    if (data !== undefined) {
      let requests = this.state.selectedTracks.map(track => (
        axios.patch('/tracks/' + track.id, data))
      );
      try {
        const res = await Promise.all(requests);
        if (res[0].status === 201) {
          const data = await this.getTracks();
          this.setState({ track_data: data });
        }
        else if (res.status === 403) {
          alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
        } else {
          alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
        }
      }
      catch (error) {
        console.log("Error when processing track promises")
        console.log(error)
        alert("Noe gikk galt under valg av løyper. Prøv å utvide tegneområdet.")
      }
    } else {
      console.log("Data is undefined");
    }
  }

  async function splitTrack(item, coords) {
    let current = null;

    item.coordinates.forEach(element => {
      let converted = proj4(
        '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
        '+proj=longlat +datum=WGS84 +no_defs ',
        element);
      converted = [converted[1], converted[0]]
      let convertedCurr = proj4(
        '++proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
        '+proj=longlat +datum=WGS84 +no_defs ',
        current);
      convertedCurr = [convertedCurr[1], convertedCurr[0]]
      if (current === null) {
        current = element
      } else if (this.calcCrow(converted[0], converted[1], coords.lat, coords.lng) < this.calcCrow(convertedCurr[0], convertedCurr[1], coords.lat, coords.lng)) {
        current = element
      }
    });

    const res = await axios.patch('/tracks/split/' + item.id + '/' + current)
    if (res.status === 201) {
      const data = await this.getTracks();
      this.setState({ track_data: data })
    }
    else if (res.status === 403) {
      alert("Det ser ut som du har blitt logget ut, logg in for å gjøre endringer");
    } else {
      alert("Noe gikk galt, last inn siden på nytt eller prøv igjen senere");
    }
  }

  function selectTracks(bounds) {
    bounds = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [bounds]
      }
    }

    let selected = []
    this.state.track_data.forEach(item => {
      //Projections. proj4 flips the coordinates for some unknown reason. This flips them back.
      let coordinates = [...item.coordinates]
      coordinates = coordinates.map((item, index) => (proj4(
        '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
        '+proj=longlat +datum=WGS84 +no_defs ',
        item)));

      coordinates = coordinates.map((item, index) => ([item[1], item[0]]))
      let check = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates
        }
      }

      if (booleanContains(bounds, check)) {
        selected.push(item)
      }
    });
    this.setState({ selectedTracks: selected })
  }

  async function forceReloadDB() {
    if (window.confirm("Trykk ok for å laste inn oppdaterte løypedata, utdaterte løyper vil bli slettet.")) {
      try {
        const resReload = await axios.get('/tracks/reload');
        if (resReload.status === 200) {
          this.getTracks().then(data => this.setState({ track_data: data }));
        }
        else {
          throw new Error('Det oppsto en feil under lasting av løyper. Prøv igjen senere.')
        }
      }
      catch (error) {
        console.log(error);
        alert("Det oppsto en feil under oppdatering av løyper.");
      }
    }
  }

  //This function takes in latitude and longitude of two locations and returns the distance between them as the crow flies (in km)
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }
}

export default App;
