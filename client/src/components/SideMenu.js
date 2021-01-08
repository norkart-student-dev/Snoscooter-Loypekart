import React, {useState} from 'react';
import PadlockImg from './../assets/padlock.png';

function SideMenu({openLoginMenu, setDrawing}) {
    const [selecting, setSelecting] = useState(false)
    return (
        <div className="SideDiv">
            <img
                src={PadlockImg}
                onClick={() => openLoginMenu()}
                alt='Error'/>
            {!selecting && <button onClick={() => {setSelecting(true); setDrawing(true)}}>Velg løyper</button>}
            {selecting && <button onClick={() => {setSelecting(false); setDrawing(false)}}>Ferdig valgt</button>}
        </div>
    )
}

export default SideMenu;