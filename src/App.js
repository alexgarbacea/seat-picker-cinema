import React, { useState } from 'react'
import './App.css';
import MainMenu from './Components/MainMenu';
import SeatPicker from './Components/SeatPicker';

const App = () => {
  // Used for demo purposes to save selected seats in session
  const [takenSeats, setTakenSeats] = useState([])

  const [page, setPage] = useState('');

  const switchPage = (newPage) => setPage(newPage);

  const addTakenSeats = (arr) => {
    setTakenSeats(prev => ([...prev, ...arr]))
  }

  return (
    <main className="App">
      {page === '' && <MainMenu switchPage = { switchPage } />}
      {
        page === 'seat-picker' && 
        <SeatPicker 
          save = { addTakenSeats } 
          switchPage = { switchPage }
          checker = {takenSeats}
          />
      }
    </main>
  );
}

export default App;
