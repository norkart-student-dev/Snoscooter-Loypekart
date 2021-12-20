import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import ContextMarker from './ContextMarker';
import Pois from './Maplayers/Pois';
import Tracks from './Maplayers/Tracks';
import PolygonDrawer from './PolygonDrawer';
import NewPoiDialog from './NewPoiDialog';
import booleanContains from '@turf/boolean-contains';
import proj4 from 'proj4';
import useTracks from '../Hooks/useTracks';
import TrackDialog from './TrackDialog';
import useAuthorization from '../Hooks/useAuthorization';


function Map({ setModal, drawing }) {
    const { tracks } = useTracks();
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedBounds, setSelectedBounds] = useState([]);
    const { isLoggedIn } = useAuthorization();

    useEffect(() => {
        if (!drawing && selectedTracks.length > 0) {
            setModal(<TrackDialog selectedTracks={selectedTracks} onDone={() => { setSelectedTracks([]); setModal(null) }} />)
        }
    }, [drawing])

    useEffect(() => {
        let bounds = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [selectedBounds]
            }
        }

        let selected = []
        if (!tracks.isLoading) {
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
        }

        setSelectedTracks(selected)
    }, [selectedBounds])

    function onContextAction(value) {
        setModal(<NewPoiDialog coords={value} onDone={() => setModal(null)} />)
    }

    return (
        <>
            <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Kart">
                        <TileLayer
                            attribution={`&copy; ${new Date().getFullYear()} Norkart AS/OpenStreetMap/EEA CLC2006`}
                            url={`//waapi.webatlas.no/maptiles/tiles/webatlas-gray-vektor/wa_grid/{z}/{x}/{y}.png?APITOKEN=${"0e5f34a6-1e66-438c-a05b-4d03077ac49f"}`}
                            mapType="vector"
                            maxZoom={20}
                            minZoom={0}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Foto">
                        <TileLayer
                            attribution={`&copy; ${new Date().getFullYear()} Norkart AS/OpenStreetMap/EEA CLC2006`}
                            url={`//waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=${"0e5f34a6-1e66-438c-a05b-4d03077ac49f"}`}
                            mapType="vector"
                            maxZoom={20}
                            minZoom={0}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Hybrid">
                        <TileLayer
                            attribution={`&copy; ${new Date().getFullYear()} Norkart AS/OpenStreetMap/EEA CLC2006`}
                            url={`//waapi.webatlas.no/maptiles/tiles/webatlas-standard-hybrid/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=${"0e5f34a6-1e66-438c-a05b-4d03077ac49f"}`}
                            mapType="vector"
                            maxZoom={20}
                            minZoom={0}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {isLoggedIn.data && <ContextMarker onAction={onContextAction} />}
                {drawing && <PolygonDrawer onUpdate={setSelectedBounds} />}

                <Tracks setModal={setModal} selectedTracks={selectedTracks} />
                <Pois setModal={setModal} />

            </MapContainer>
        </>
    )
}

export default Map;