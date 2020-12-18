import Leaflet from 'leaflet';
import ParkingImage from '../assets/Parkering.jpg';
import ReststopImage from '../assets/Rasteplass.jpg';
import TentImage from '../assets/Teltplass.jpg';
import FoodstopImage from '../assets/Spisested.jpg';
import ReststopWcImage from '../assets/Rasteplass_wc.jpg';
import GasImage from '../assets/bensin.jpg';
import EasteryImage from '../assets/bespisning.jpg';
import LeanToImage from '../assets/gapahuk.jpg';
import PaidParkingImage from '../assets/parkering_avgift.PNG';
import AutoRepairImage from '../assets/verksted.jpg';
import OvernightStayImage from '../assets/overnatting.jpg';

const size = 40

const gasIcon = Leaflet.icon({
    iconUrl: GasImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const eateryIcon = Leaflet.icon({
    iconUrl: EasteryImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const leanToIcon = Leaflet.icon({
    iconUrl: LeanToImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const paidParkingIcon = Leaflet.icon({
    iconUrl: PaidParkingImage,
    iconSize:     [size, 50], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const autoRepairIcon = Leaflet.icon({
    iconUrl: AutoRepairImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const overnightStayIcon = Leaflet.icon({
    iconUrl: OvernightStayImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const parkingIcon = Leaflet.icon({
    iconUrl: ParkingImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const restStopIcon = Leaflet.icon({
    iconUrl: ReststopImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const tentIcon = Leaflet.icon({
    iconUrl: TentImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const foodStopIcon = Leaflet.icon({
    iconUrl: FoodstopImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const reststopWcIcon = Leaflet.icon({
    iconUrl: ReststopWcImage,
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size/2], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const markerHtmlStyles = `
        background-color: blue;
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`
    
const defaultIcon = Leaflet.divIcon({
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
})

export {
    gasIcon,
    eateryIcon,
    leanToIcon,
    paidParkingIcon,
    autoRepairIcon,
    overnightStayIcon,
    parkingIcon,
    restStopIcon,
    reststopWcIcon,
    tentIcon,
    foodStopIcon,
    defaultIcon,

}