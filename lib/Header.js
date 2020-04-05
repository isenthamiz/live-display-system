import React from 'react';
import './../styles/Header.css'

export default class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="main-options">
                    <ul className="main-options-items">
                        <li className="main-options-item"><i className="fas fa-bars"></i></li>
                    </ul>
                </div>
                <div  className="main-logo">
                    <span>Metro Train Live Display System</span>
                </div>
            </header>
        )
    }
}