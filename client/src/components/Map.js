import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';
import PoiMarker from './PoiMarker';
import TrackMarker from './TrackMarker';

export default React.memo(function Map({createPoi, editPoi, deletePoi, poi_data, track_data}){
    const user = useContext(UserContext)
   
    return(
        <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

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
                    />
                ))
            }

            {track_data.features !== undefined &&
                track_data.features.map((item, index) => (
                    <TrackMarker item={item}/>
                ))  
            }
        </MapContainer>
    )
});
