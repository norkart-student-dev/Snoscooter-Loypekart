import React, {useContext, useState} from 'react';
import { Popup, Marker, useMapEvents } from 'react-leaflet';
import { 
    parkingIcon, restStopIcon, reststopWcIcon, tentIcon, foodStopIcon, defaultIcon,
    gasIcon, eateryIcon, leanToIcon, paidParkingIcon, autoRepairIcon, overnightStayIcon 
} from './Icons';
import UserContext from '../Context';
import Icon from './Icon';

    // Returns the relevant marker for the item given 
    export default function PoiMarker({item, editPoi, movePoi, deletePoi}) {
        const user = useContext(UserContext)
        const [moving, setMoving] = useState(null)
        const popup = React.createRef()

        const closePopup = () => {
            popup.current._closeButton.click()
        }

        const movePoiPrompt = (latlng) => {
            if(moving){
                movePoi(moving, latlng)
                setMoving(null)
            }
        }

        useMapEvents({
            click(e) {
                if (moving){
                    movePoiPrompt(e.latlng)
                }
            },
            popupopen(e) {
                if(moving){
                    e.popup._closeButton.click()
                }
            }
        })

        const iconValues = {
            'Parkeringsplass' : parkingIcon,
            'Rasteplass' : restStopIcon,
            'Rasteplass med WC' : reststopWcIcon,
            'Matservering' : eateryIcon,
            'Teltplass' : tentIcon,
            'Bensin' : gasIcon,
            'Gapahuk' : leanToIcon,
            'Parkering mot Avgift' : paidParkingIcon,
            'Verksted' : autoRepairIcon,
            'Overnatting' : overnightStayIcon,
            'Sted' : Icon(item)
        }
        
        let iconString = item.type;
        return(
            <Marker position={item.location.coordinates} icon={iconValues[iconString]}>
                <Popup className='PoiInfo' ref={popup}>

                    <p>
                        <b>Navn:</b> {item.name} <br/>
                        <b>Type:</b> {item.type} <br/>
                    </p>
                    {item.comment ? <p>
                        <b>Informasjon:</b> <br/>
                        {item.comment}
                    </p> : null}

                    {user.loggedIn && <button onClick={() => {editPoi(item._id); closePopup();}}>Endre</button>}
                    {user.loggedIn && <button onClick={() => {setMoving(item._id); closePopup();}}>Flytt</button>}
                    {user.loggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi(item._id); closePopup();}}>Slett</button>}

                </Popup>
            </Marker>
        );
    }