import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import ContextMarker from './ContextMarker';
import PoiMarker from './PoiMarker';
import Tracks from './Maplayers/Tracks';
import PolygonDrawer from './PolygonDrawer';
import NewPoiDialog from './NewPoiDialog';


function Map({ setModal, onSelectionUpdate, drawing }) {

    function onContextAction(value) {
        setModal(<NewPoiDialog coords={value} onDone={() => setModal(null)} />)
    }
    console.log("render")
    return (
        <>
            <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {<ContextMarker onAction={onContextAction} />}
                {drawing && <PolygonDrawer onUpdate={onSelectionUpdate} />}



                <Tracks setModal={setModal} />
            </MapContainer>
        </>
    )
}

export default Map;