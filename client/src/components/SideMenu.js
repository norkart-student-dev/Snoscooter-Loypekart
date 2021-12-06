import React, { useState, useContext } from 'react';
import PadlockImg from './../assets/padlock.png';
import UserContext from '../Context';
import useAuthorization from '../Hooks/useAuthorization';
import LoginDialog from './LoginDialog';

function SideMenu({ openLoginMenu, setDrawing, forceReloadDB }) {
    const [selecting, setSelecting] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const { isLoggedIn } = useAuthorization();

    return (
        <>
            {showLoginDialog ? <LoginDialog onClose={() => setShowLoginDialog(false)} /> : null}
            <div className="SideDiv">
                {isLoggedIn ? <button onClick={() => setShowLoginDialog(true)}>Logg inn</button> : <button>Logg ut</button>}

                {!selecting && <button onClick={() => { setSelecting(true); setDrawing(true) }}>Velg løyper</button>}
                {selecting && <button onClick={() => { setSelecting(false); setDrawing(false) }}>Ferdig valgt</button>}
                {<button onClick={() => { forceReloadDB() }}>Last inn Løypedata på nytt</button>}
            </div>
        </>
    )
}

export default SideMenu;