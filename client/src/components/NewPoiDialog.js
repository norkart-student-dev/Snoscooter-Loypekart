import { useState, useEffect } from 'react';
import usePois from '../Hooks/usePois';

export default function NewPoiDialog({ coords, onDone, selectedPoi }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('Parkeringsplass')
    const [info, setInfo] = useState('')
    const { createPoi, updatePoi } = usePois();

    useEffect(() => {
        if (selectedPoi) {
            setName(selectedPoi.name)
            setType(selectedPoi.type)
            setInfo(selectedPoi.info)
        }
    }, [selectedPoi])

    const nameOnchange = (event) => {
        setName(event.target.value)
    }
    const typeOnchange = (event) => {
        setType(event.target.value)
    }
    const commentOnChange = (event) => {
        setInfo(event.target.value)
    }

    let onConfirm = () => {
        if (selectedPoi) {
            updatePoi.mutate({
                ...selectedPoi,
                "name": name,
                "type": type,
                "info": info,
            })
        } else {
            createPoi.mutate({
                "name": name,
                "type": type,
                "info": info,
                "location": {
                    "type": "Point",
                    "coordinates": [coords.lat, coords.lng]
                }
            })
        }
        onDone()
    };



    let options = [
        'Parkeringsplass', 'Rasteplass', 'Rasteplass med WC', 'Matservering', 'Teltplass',
        'Bensin', 'Gapahuk', 'Parkering mot Avgift', 'Verksted', 'Overnatting', 'Sted']

    return (
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={name} onChange={nameOnchange}></input>
                <select className='NewPoiDialog-items' value={type} onChange={typeOnchange}>
                    {options.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))}
                </select>
                <textarea className="NewPoiDialog-textarea" value={info} onChange={commentOnChange} />
                <button className='NewPoiDialog-button'
                    onClick={onConfirm}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={onDone}>Avbryt</button>
            </div>
        </div>

    )
}