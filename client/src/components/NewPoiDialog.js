import {useState, useEffect} from 'react';

export default function NewPoiDialog({coords, onDone, selectedPoi}){
    const [name, setName] = useState('');
    const [type, setType] = useState('Parkeringsplass')

    useEffect(() => {
        setName(selectedPoi.name)
        setType(selectedPoi.type)
    }, [selectedPoi])

    const nameOnchange = (event) => {
        setName(event.target.value)
    }
    const typeOnchange = (event) => {
        setType(event.target.value)
    }


    let onConfirm = null;

    if(coords === undefined){
        onConfirm = () => onDone(null, { 
            "name": name, 
            "type": type,
          })
    } else {
        onConfirm = () => onDone(null, { 
            "name": name, 
            "type": type,
            "location": { 
                "type": "Point", 
                "coordinates": [coords.lat, coords.lng]
            }
        })
    }

    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={name} onChange={nameOnchange}></input>
                <select className='NewPoiDialog-items' value={type} onChange={typeOnchange}>
                    <option value="Parkeringsplass">Parkeringsplass</option>
                    <option value="Rasteplass">Rasteplass</option>
                    <option value="Rasteplass med WC">Rasteplass med WC</option>
                    <option value="Matservering">Matservering</option>
                    <option value="Teltplass">Teltplass</option>
                </select>
                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone(null)}>Avbryt</button>
            </div>
        </div>
        
    )
}