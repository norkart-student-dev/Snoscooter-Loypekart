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
import usePois from '../Hooks/usePois';
import useTracks from '../Hooks/useTracks';


function Map({ createPoi, editPoi, movePoi, deletePoi, editTrack, deleteTrack, splitTrack, onSelectionUpdate, selectedTracks, drawing }) {
    const pois = usePois();
    const tracks = useTracks();
    const user = useContext(UserContext);


    return (
        <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {<ContextMenu createPoi={createPoi} />}
            {drawing && <PolygonDrawer onUpdate={onSelectionUpdate} />}

            <MarkerClusterGroup>
                {!pois.isLoading &&
                    pois.data.map((item, index) => (
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


            {!tracks.isLoading &&
                tracks.data.map((item, index) => (
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
}

export default Map;