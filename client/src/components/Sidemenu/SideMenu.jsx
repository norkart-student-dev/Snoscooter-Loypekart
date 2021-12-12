import React, { useState } from 'react';
import useAuthorization from '../../Hooks/useAuthorization';
import LoginDialog from '../LoginDialog';
import "./Sidemenu.css";

function SideMenu({ setDrawing, forceReloadDB }) {
    const [selecting, setSelecting] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const { isLoggedIn, logout } = useAuthorization();

    console.log("render sidemenu")
    return (
        <>
            {showLoginDialog ? <LoginDialog onClose={() => setShowLoginDialog(false)} /> : null}
            <div className="menu">
                {!isLoggedIn.data ? <button onClick={() => setShowLoginDialog(true)}>Logg inn</button> : <button onClick={() => { if (window.confirm("Er du sikker på at du vil logge ut?")) logout.mutate() }}>Logg ut</button>}
                {isLoggedIn.data && !selecting && <button onClick={() => { setSelecting(true); setDrawing(true) }}>Velg løyper</button>}
                {isLoggedIn.data && selecting && <button onClick={() => { setSelecting(false); setDrawing(false) }}>Ferdig valgt</button>}
                {isLoggedIn.data && <button onClick={() => { forceReloadDB() }}>Last inn Løypedata på nytt</button>}
            </div>
        </>
    )
}

export default SideMenu;