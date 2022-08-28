import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function NavigateBack() {
    const Navigate = useNavigate();
    return (

        <button style={{ fontSize: "2.2vh" }} onClick={() => Navigate(-1)} >
            <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontSize: "2.4vh" }}>
                keyboard_backspace
            </span>
            &nbsp; Return
        </button>

    )
}
