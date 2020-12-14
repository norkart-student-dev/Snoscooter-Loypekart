import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';
import PoiMarker from './PoiMarker';

export default function Map({createPoi, editPoi, deletePoi, poi_data}){
    const user = useContext(UserContext)
   
    return(
        <MapContainer className='Map' center={[60.39, 5.32]} zoom={13} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {user.loggedIn && <ContextMenu createPoi={createPoi}/>}

            {poi_data !== undefined && 
                poi_data.map((item, index) => (
                <PoiMarker 
                    key={item._id} 
                    item={item} 
                    editPoi={editPoi} 
                    deletePoi={deletePoi}
                />))
            }
        </MapContainer>
    )
}
