import React, { useRef, useState } from 'react';
import { LayerGroup, MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import ContextMarker from './ContextMarker';
import PoiMarker from './PoiMarker';
import Tracks from './Maplayers/Tracks';
import PolygonDrawer from './PolygonDrawer';
import NewPoiDialog from './NewPoiDialog';
import booleanContains from '@turf/boolean-contains';
import proj4 from 'proj4';
import useTracks from '../Hooks/useTracks';


function Map({ setModal, onSelectionUpdate, drawing }) {
    const { tracks } = useTracks();
    const [selectedTracks, setSelectedTracks] = useState();
    const tracksLayerRef = useRef()

    function onContextAction(value) {
        setModal(<NewPoiDialog coords={value} onDone={() => setModal(null)} />)
    }
    console.log("render")

    /*function selectTracks(bounds) {
        bounds = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [bounds]
            }
        }

        let selected = []
        tracks.data.forEach(item => {

            let coordinates = [...item.coordinates]
            coordinates = coordinates.map((item, index) => (proj4(
                '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
                '+proj=longlat +datum=WGS84 +no_defs ',
                item)));

            //proj4 flips the coordinates for some unknown reason. This flips them back.
            coordinates = coordinates.map((item, index) => ([item[1], item[0]]))
            let check = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: coordinates
                }
            }

            if (booleanContains(bounds, check)) {
                selected.push(item)
            }
        });
        setSelectedTracks(selected)
    }*/
    function selectTracks(bounds) {
        console.log(tracksLayerRef.current)
    }

    return (
        <>
            <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {<ContextMarker onAction={onContextAction} />}
                {drawing && <PolygonDrawer onUpdate={selectTracks} />}

                <LayerGroup

                <Tracks ref={tracksLayerRef} setModal={setModal} selectedTracks={selectedTracks} />
            </MapContainer>
        </>
    )
}

export default Map;