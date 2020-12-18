import {useState, useEffect} from 'react';

export default function NewPoiDialog({coords, onDone, selectedPoi}){
    const [name, setName] = useState('');
    const [type, setType] = useState('Parkeringsplass')
    const [comment, setComment] = useState('')

    useEffect(() => {
        setName(selectedPoi.name)
        setType(selectedPoi.type)
        setComment(selectedPoi.comment)
    }, [selectedPoi])

    const nameOnchange = (event) => {
        setName(event.target.value)
    }
    const typeOnchange = (event) => {
        setType(event.target.value)
    }
    const commentOnChange = (event) => {
        setComment(event.target.value)
    }


    let onConfirm = null;

    if(coords === undefined){
        onConfirm = () => onDone(null, { 
            "name": name, 
            "type": type,
            "comment": comment,
          })
    } else {
        onConfirm = () => onDone(null, { 
            "name": name, 
            "type": type,
            "comment": comment,
            "location": { 
                "type": "Point", 
                "coordinates": [coords.lat, coords.lng]
            }
        })
    }

    let options = [
        'Parkeringsplass', 'Rasteplass', 'Rasteplass med WC', 'Matservering', 'Teltplass',
        'Bensin', 'Gapahuk', 'Parkering mot Avgift', 'Verksted', 'Overnatting', 'Sted']
        
    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={name} onChange={nameOnchange}></input>
                <select className='NewPoiDialog-items' value={type} onChange={typeOnchange}>
                  {options.map((option) => (
                      <option value = {option}>{option}</option>
                  ))}
                </select>
                <textarea value={comment} onChange={commentOnChange} />
                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone(null)}>Avbryt</button>
            </div>
        </div>
        
    )
}