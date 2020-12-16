import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';
import PoiMarker from './PoiMarker';
import TrackMarker from './TrackMarker';

const RenderMap = React.memo(({createPoi, editPoi, deletePoi, poi_data, track_data, loggedIn}) => {
    console.log(loggedIn);
    return (
        <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {loggedIn && <ContextMenu createPoi={createPoi}/>}

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

            {track_data.length !== 0 &&
                track_data.map((item, index) => (
                    <TrackMarker
                        key={item._id}
                        item={item}
                        editTrack={editTrack}
                    />
                ))  
            }
        </MapContainer>
    )
});

export default function Map({createPoi, editPoi, deletePoi, poi_data, track_data}) {
    const user = useContext(UserContext);
    console.log(user.loggedIn);
    return <RenderMap
                createPoi={createPoi}
                editPoi={editPoi}
                deletePoi={deletePoi}
                track_data={track_data}
                loggedIn={user.loggedIn}>
            </RenderMap>
}