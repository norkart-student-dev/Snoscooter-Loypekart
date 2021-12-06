import React, { useContext, useState } from 'react';
import { Popup, Marker, useMapEvents } from 'react-leaflet';
import {
    parkingIcon, restStopIcon, reststopWcIcon, tentIcon,
    gasIcon, eateryIcon, leanToIcon, paidParkingIcon, autoRepairIcon, overnightStayIcon
} from './Icons';
import Icon from './Icon';
import useAuthorization from '../Hooks/useAuthorization';
import usePois from '../Hooks/usePois';
import NewPoiDialog from './NewPoiDialog';

// Returns the relevant marker for the item given 
export default function PoiMarker({ poi }) {
    const [moving, setMoving] = useState(false);
    const [showPoiDialog, setShowPoiDialog] = useState(false);
    const popup = React.createRef();
    const isLoggedIn = useAuthorization();
    const { updatePoi, deletePoi } = usePois();

    const closePopup = () => {
        popup.current._closeButton.click()
    }

    const movePoi = (latlng) => {
        updatePoi.mutate({
            id: poi.id,
            location: {
                "type": "Point",
                "coordinates": [latlng.lat, latlng.lng]
            }
        })
        setMoving(false)
    }

    useMapEvents({
        click(e) {
            if (moving) {
                movePoi(e.latlng)
            }
        },
        popupopen(e) {
            if (moving) {
                e.popup._closeButton.click()
            }
        }
    })

    const iconValues = {
        'Parkeringsplass': parkingIcon,
        'Rasteplass': restStopIcon,
        'Rasteplass med WC': reststopWcIcon,
        'Matservering': eateryIcon,
        'Teltplass': tentIcon,
        'Bensin': gasIcon,
        'Gapahuk': leanToIcon,
        'Parkering mot Avgift': paidParkingIcon,
        'Verksted': autoRepairIcon,
        'Overnatting': overnightStayIcon,
        'Sted': Icon(poi)
    }

    let iconString = poi.type;
    return (
        <>
            {showPoiDialog ? <NewPoiDialog coords={poi.location.coordinates} onDone={() => setShowPoiDialog(false)} selectedPoi={poi} /> : null}
            <Marker position={poi.location.coordinates} icon={iconValues[iconString]}>
                <Popup className='PoiInfo' ref={popup}>

                    <p>
                        <b>Navn:</b> {poi.name} <br />
                        <b>Type:</b> {poi.type} <br />
                    </p>
                    {poi.comment ? <p>
                        <b>Informasjon:</b> <br />
                        {poi.comment}
                    </p> : null}

                    {isLoggedIn && <button onClick={() => { setShowPoiDialog(true); closePopup(); }}>Endre</button>}
                    {isLoggedIn && <button onClick={() => { if (window.confirm('Hvis du ønsker å flytte punktet så klikk ok, deretter klikk i kartet der det skal flyttes til. Hvis ikke klikk avbryt')) setMoving(true); closePopup(); }}>Flytt</button>}
                    {isLoggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi.mutate(poi.id); closePopup(); }}>Slett</button>}

                </Popup>
            </Marker>
        </>
    );
}