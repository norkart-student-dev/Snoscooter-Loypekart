import React, {useState, useContext} from 'react';
import { Popup, Polyline, useMapEvents } from 'react-leaflet';
import proj4 from 'proj4';
import UserContext from '../Context';
    
    // draws the relevant track for the item given 
    export default function TrackMarker({item, editTrack, splitTrack, deleteTrack, selectedTracks}) {
        const user = useContext(UserContext)
        const [position, setPosition] = useState(null)
        const popup = React.createRef()

        const closePopup = () => {
            console.log(popup.current._closeButton.click())
        }

        //Projections. proj4 flips the coordinates for some unknown reason. I flip them back.

        let coordinates = [...item.geometry.coordinates]
        
        coordinates = coordinates.map((item,index) => (proj4(
            '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ', 
            '+proj=longlat +datum=WGS84 +no_defs ', 
            item)));

        coordinates = coordinates.map((item,index) => ([item[1], item[0]]))

        let pathOptions = {color:'green', weight: 7, smoothFactor:0.2}


        if (selectedTracks.some(track => track._id === item._id)) {
            pathOptions.color = 'blue'
        } else if(item.MIDL_STENGT === true) {
            pathOptions.color ='red'
        }

        let coords = null;

        useMapEvents({
            popupopen(e) {
                if(e.popup.options.id === item.id){
                    e.popup._source.setStyle({
                        color: 'blue'
                    });
                    coords = e.popup._latlng
                }
            },

            popupclose(e) {
                if(e.popup.options.id === item.id){
                    e.popup._source.setStyle({
                        color: pathOptions.color
                    });
                }
            }
        })

        return(
            <Polyline className='trackLine' pathOptions={pathOptions} positions={coordinates}>
                <Popup className='trackInfo' id={item.id} position={position} ref={popup}>
                    <p>
                        { user.loggedIn ? <span><b>Id:</b> {item.LOKAL_ID} <br/></span> : null}
                        
                        <b>Status:</b> {item.MIDL_STENGT ? 'Stengt' : 'Åpen'}
                    </p>              

                    {item.KOMMENTAR ? 
                        <p>
                            <b>Informasjon:</b> <br/>
                            {item.KOMMENTAR}
                        </p> 
                    : null}

                    {user.loggedIn && <button onClick={() => {
                        editTrack([item]); 
                        closePopup(); 
                    }}>Endre</button>}
                    {user.loggedIn && <button onClick={() => {
                        splitTrack(item, coords); 
                        closePopup();
                    }}>Del linjen her</button>}
                    {user.loggedIn && <button onClick={() => {
                        if (window.confirm('Dette vil fjerne alle kommentarer og delinger som hører til denne linjen og gjenopprette den originale linjen slik den var.')) deleteTrack(item.id); 
                        closePopup();
                    }}>Tilbakestill</button>}
                </Popup>
            </Polyline>
        );
    }