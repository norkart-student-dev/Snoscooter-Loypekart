import React from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { parkingIcon } from './Icons'
import 'leaflet/dist/leaflet.css';

export default function Mapview(props){
    
   
    return(
        <MapContainer className='Map' center={[60.39, 5.32]} zoom={13} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {props.pois !== undefined && props.pois.map((item, index) => {
                return(
                    <Marker position={item.location.coordinates} key={item._id} icon={parkingIcon} >
                </Marker>
                );
            })}
        </MapContainer>
    )
}