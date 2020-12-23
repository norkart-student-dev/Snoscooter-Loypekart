import React, {useState, useContext} from 'react';
import { Popup, Polyline, useMapEvents } from 'react-leaflet';
import proj4 from 'proj4';
import UserContext from '../Context';
import TrackmarkerPopup from './TrackMarkerPopup';
    
    // draws the relevant track for the item given 
    export default function TrackMarker({item, editTrack, splitTrack}) {
        const user = useContext(UserContext)
        const [position, setPosition] = useState(null)
        const popup = React.createRef()

        const closePopup = () => {
            console.log(popup.current._closeButton.click())
            //popup.current.leafletElement.options.leaflet.map.closePopup();
        }

        //Projections. proj4 flips the coordinates for some unknown reason. I flip them back.
        let coordinates = item.geometry.coordinates.map((item,index) => ([item[0], item[1]]))
        coordinates = coordinates.map((item,index) => (proj4(
            '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs ', 
            '+proj=longlat +datum=WGS84 +no_defs ', 
            item)));

        coordinates = coordinates.map((item,index) => ([item[1], item[0]]))

        let pathOptions = {color:'green', weight: 7, smoothFactor:0.2}
        if(item.properties.MIDL_STENGT === true){
            pathOptions.color ='red'
        }

        let coords = null;

        useMapEvents({
            popupopen(e) {
                if(e.popup.options.id === item._id){
                    e.popup._source.setStyle({
                        color: 'blue'
                    });
                    coords = e.popup._latlng
                }
            },

            popupclose(e) {
                if(e.popup.options.id === item._id){
                    e.popup._source.setStyle({
                        color: pathOptions.color
                    });
                }
            }
        })

        return(
            <Polyline className='trackLine' pathOptions={pathOptions} positions={coordinates}>
                <Popup className='trackInfo' id={item._id} position={position} ref={popup}>
                    <p><b>Status:</b> {item.properties.MIDL_STENGT ? 'Stengt' : 'Åpen'}</p>

                    {item.properties.KOMMENTAR ? 
                        <p>
                            <b>Informasjon:</b> <br/>
                            {item.properties.KOMMENTAR}
                        </p> 
                    : null}

                    {user.loggedIn && <button onClick={() => {
                        editTrack(item._id); 
                        closePopup(); 
                    }}>Endre</button>}
                    {user.loggedIn && <button onClick={() => {
                        splitTrack(item, coords); 
                        closePopup();
                    }}>Split her</button>}
                </Popup>
            </Polyline>
        );
    }