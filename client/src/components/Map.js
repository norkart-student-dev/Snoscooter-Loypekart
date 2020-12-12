import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { parkingIcon, restStopIcon, defaultIcon } from './Icons';
import 'leaflet/dist/leaflet.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';

export default function Map({createPoi, editPoi, deletePoi, poi_data}){
    const user = useContext(UserContext)

    // Returns the relevant marker for the item given 
    const poiMarker = (item) => {
        
        let icon = null
        if(item.type === 'Parkeringsplass'){
            icon = parkingIcon
        } else if(item.type === 'Rasteplass'){
            icon = restStopIcon
        } else {
            icon = defaultIcon
        }

        return(
            <Marker position={item.location.coordinates} key={item._id} icon={icon}>
                <Popup className='PoiInfo'>
                    <p>Navn: {item.name} <br/>Type: {item.type}</p>
                    {user.loggedIn && <button onClick={() => editPoi(item._id)}>Endre</button>}
                    {user.loggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi(item._id)}}>Slett</button>}

                </Popup>
            </Marker>
        );
    }
   
    return(
        <MapContainer className='Map' center={[60.39, 5.32]} zoom={13} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {user.loggedIn && <ContextMenu createPoi={createPoi}/>}

            {poi_data !== undefined && poi_data.map((item, index) => (poiMarker(item)))}
        </MapContainer>
    )
}
