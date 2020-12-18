import React, {useContext} from 'react';
import { Popup, Marker } from 'react-leaflet';
import { 
    parkingIcon, restStopIcon, reststopWcIcon, tentIcon, foodStopIcon, defaultIcon,
    gasIcon, eateryIcon, leanToIcon, paidParkingIcon, autoRepairIcon, overnightStayIcon 
} from './Icons';
import UserContext from '../Context';
    
    // Returns the relevant marker for the item given 
    export default function PoiMarker({item, editPoi, deletePoi}) {
        const user = useContext(UserContext)

        const iconValues = {
            'Parkeringsplass' : parkingIcon,
            'Rasteplass' : restStopIcon,
            'Rasteplass med WC' : reststopWcIcon,
            'Matservering' : foodStopIcon,
            'Teltplass' : tentIcon,
            'Bensin' : gasIcon,
            'Bespisning' : eateryIcon,
            'Gapahuk' : leanToIcon,
            'Parkering mot Avgift' : paidParkingIcon,
            'Verksted' : autoRepairIcon,
            'Overnatting' : overnightStayIcon
        }
        
        let iconString = item.type;
        return(
            <Marker position={item.location.coordinates} icon={iconValues[iconString]}>
                <Popup className='PoiInfo'>
                    <p>Navn: {item.name} <br/>Type: {item.type}</p>
                    {user.loggedIn && <button onClick={() => editPoi(item._id)}>Endre</button>}
                    {user.loggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi(item._id)}}>Slett</button>}

                </Popup>
            </Marker>
        );
    }