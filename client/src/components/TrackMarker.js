import React, {useContext} from 'react';
import { Popup, Polyline, useMapEvents } from 'react-leaflet';
import proj4 from 'proj4';
import UserContext from '../Context';
    
    // draws the relevant track for the item given 
    export default function TrackMarker({item, editTrack}) {
        const user = useContext(UserContext)

        //TODO Something is wrong here
        let coordinates = item.geometry.coordinates.map((item,index) => ([item[0], item[1]]))
        coordinates = coordinates.map((item,index) => (proj4(
            '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', 
            '+proj=longlat +datum=WGS84 +no_defs ', 
            item)));

        coordinates = coordinates.map((item,index) => ([item[1], item[0]]))

        let pathOptions = {color:'green', weight: 7, smoothFactor:0.2}
        if(item.properties.MIDL_STENGT === true){
            pathOptions.color ='red'
        }

        useMapEvents({
            popupopen(e) {
                if(e.popup.options.id === item._id){
                    e.popup._source.setStyle({
                        color: 'blue'
                    });
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
                <Popup className='trackInfo' id={item._id}>
                    <p>Navn: {item.properties.NAVN}</p>
                    {user.loggedIn && <button onClick={() => {editTrack(item._id)}}>Endre</button>}
                    {user.loggedIn && <button>Split her</button>}
                </Popup>
            </Polyline>
        );
    }