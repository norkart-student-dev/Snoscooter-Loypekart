import Leaflet from 'leaflet';
import ParkingImage from '../assets/Parkering.jpg';
import ReststopImage from '../assets/Rasteplass.jpg';
import TentImage from '../assets/Teltplass.jpg';
import FoodstopImage from '../assets/Spisested.jpg';
import ReststopWcImage from '../assets/Rasteplass_wc.jpg';


const parkingIcon = Leaflet.icon({
    iconUrl: ParkingImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const restStopIcon = Leaflet.icon({
    iconUrl: ReststopImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const tentIcon = Leaflet.icon({
    iconUrl: TentImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const foodStopIcon = Leaflet.icon({
    iconUrl: FoodstopImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const reststopWcIcon = Leaflet.icon({
    iconUrl: ReststopWcImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const markerHtmlStyles = `
        background-color: green;
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
    parkingIcon,
    restStopIcon,
    reststopWcIcon,
    tentIcon,
    foodStopIcon,
    defaultIcon
}