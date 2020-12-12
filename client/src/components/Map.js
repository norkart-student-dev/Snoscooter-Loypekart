import React from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { parkingIcon } from './Icons';
import 'leaflet/dist/leaflet.css';
import ContextMenu from './ContextMenu';

export default function Map(props){
   
    return(
        <MapContainer 
            className='Map' 
            center={[60.39, 5.32]} 
            zoom={13}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ContextMenu createPoi={props.createPoi} creatingPoi={props.creatingPoi}/>

            {props.pois !== undefined && props.pois.map((item, index) => {
                return(
                    <Marker position={item.location.coordinates} key={item._id} icon={parkingIcon}>
                    </Marker>
                );
            })}
        </MapContainer>
    )
}
