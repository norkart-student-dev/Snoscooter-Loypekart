import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';
import PoiMarker from './PoiMarker';
import TrackMarker from './TrackMarker';
import PolygonDrawer from './PolygonDrawer';

const RenderMap = React.memo(({createPoi, editPoi, movePoi, deletePoi, poi_data, editTrack, deleteTrack, onSelectionUpdate, track_data, loggedIn, splitTrack, selectedTracks, drawing}) => {
    return (
        <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {loggedIn && <ContextMenu createPoi={createPoi}/>}
            {loggedIn && drawing && <PolygonDrawer onUpdate={onSelectionUpdate}/>}

            <MarkerClusterGroup>
                {poi_data !== undefined && 
                    poi_data.map((item, index) => (
                        <PoiMarker 
                            key={item.id} 
                            item={item} 
                            editPoi={editPoi}
                            movePoi={movePoi}
                            deletePoi={deletePoi}
                        />
                    ))
                }
            </MarkerClusterGroup>


            {track_data.length !== 0 &&
                track_data.map((item, index) => (
                    <TrackMarker
                        key={item.id}
                        item={item}
                        editTrack={editTrack}
                        splitTrack={splitTrack}
                        deleteTrack={deleteTrack}
                        selectedTracks={selectedTracks}
                    />
                ))  
            }
        </MapContainer>
    )
});

export default function Map({createPoi, editPoi, movePoi, deletePoi, poi_data, editTrack, deleteTrack, splitTrack, onSelectionUpdate, track_data, selectedTracks, drawing}) {
    const user = useContext(UserContext);
    return <RenderMap
                createPoi={createPoi}
                editPoi={editPoi}
                movePoi={movePoi}
                deletePoi={deletePoi}
                poi_data={poi_data}
                editTrack={editTrack}
                deleteTrack={deleteTrack}
                splitTrack={splitTrack}
                onSelectionUpdate={onSelectionUpdate}
                track_data={track_data}
                loggedIn={user.loggedIn}
                selectedTracks={selectedTracks}
                drawing={drawing}>
            </RenderMap>
}