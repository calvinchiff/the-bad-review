import React from 'react'
import './LinkButton.css'
import { Link } from "react-router-dom";


export default function LinkButton({ name, to, isDisabled }) {

    return (
        <button className='Button-link' disabled={isDisabled}>
            <Link className='Button-link-inner' to={to}>{name}</Link>
        </button>
    )
}