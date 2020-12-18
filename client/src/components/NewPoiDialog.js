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

    let options = [
        'Parkeringsplass', 'Rasteplass', 'Rasteplass med WC', 'Matservering', 'Teltplass',
        'Bensin', 'Bespisning', 'Gapahuk', 'Parkering mot Avgift', 'Verksted', 'Overnatting']
        
    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={name} onChange={nameOnchange}></input>
                <select className='NewPoiDialog-items' value={type} onChange={typeOnchange}>
                  {options.map((option) => (
                      <option value = {option}>{option}</option>
                  ))}
                </select>
                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone(null)}>Avbryt</button>
            </div>
        </div>
        
    )
}