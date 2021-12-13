import React from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import SideMenu from './components/Sidemenu/SideMenu';
import proj4 from 'proj4';
import booleanContains from '@turf/boolean-contains';

function App() {
  const [drawing, setDrawing] = React.useState(false);
  const [modal, setModal] = React.useState(null)


  return (
    <>
      {modal}
      <SideMenu
        setDrawing={setDrawing}
        forceReloadDB={forceReloadDB}
      ></SideMenu>
      <Map
        setModal={setModal}
        drawing={drawing}
      />
    </>
  );


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
