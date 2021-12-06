import { useState, useEffect } from 'react';
import useTracks from '../Hooks/useTracks';

export default function TrackDialog({ onDone, selectedTracks }) {
    console.log("render dialog")
    const { updateTrack } = useTracks();
    const [closed, setClosed] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (selectedTracks.length === 1) {
            setClosed(selectedTracks[0].MIDL_STENGT)
            setComment(selectedTracks[0].KOMMENTAR)
        }
    }, [selectedTracks])

    const closedOnChange = (event) => {
        setClosed(event.target.value)
    }
    const commentOnChange = (event) => {
        setComment(event.target.value)
    }

    function onConfirm() {
        selectedTracks.forEach(track => {
            updateTrack.mutate({
                id: track.id,
                MIDL_STENGT: closed,
                KOMMENTAR: comment
            })
        });

        onDone()
    }

    return (
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <select className='NewPoiDialog-items' value={closed} onChange={closedOnChange}>
                    <option value={false}>Åpen</option>
                    <option value={true}>Stengt</option>
                </select>

                <textarea value={comment} onChange={commentOnChange}></textarea>

                <button className='NewPoiDialog-button'
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone()}>Avbryt</button>
            </div>
        </div>
    )
}