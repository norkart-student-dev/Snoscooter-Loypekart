import React from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import SideMenu from './components/Sidemenu/SideMenu';
import { useQueryClient } from "react-query";

function App() {
  const [drawing, setDrawing] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const queryClient = useQueryClient();


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
          queryClient.invalidateQueries('tracks')
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
}

export default App;
