import React from 'react'
import { movieName } from '../Data/MockRoom'

const MainMenu = ({ switchPage }) => {
    return (
        <section className='center-section'>
            <div className='box'>
                <h2>Cinema REACT</h2>
                <p>Today's movie: {movieName}</p>
                <div className='btn-main' onClick={() => switchPage('seat-picker')}>Pick your seats</div>
                <div className='btn-secondary'>Create a room</div>
            </div>
        </section>
    )
}

export default MainMenu